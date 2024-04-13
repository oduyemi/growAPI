import express, { Request, Response } from "express";
import Admin, { IAdmin } from "../models/adminModel";
import bcrypt from "bcrypt";


const router = express.Router();





router.put("/admin/:adminId", async (req: Request, res: Response) => {
    try {
        const adminId = req.params.adminId;
        const updatedAdminData: Partial<IAdmin> = req.body;

        const requiredFields = ["fname", "lname", "email", "phone", "password"];
        const missingFields = requiredFields.filter(field => !(field in updatedAdminData));

        if (missingFields.length > 0) {
            return res.status(400).json({ message: `Missing required fields: ${missingFields.join(", ")}` });
        }

        const updatedAdmin= await Admin.findByIdAndUpdate(adminId, updatedAdminData, { new: true });

        if (!updatedAdmin) {
            return res.status(404).json({ Message: "Admin not found" });
        }

        res.json({ data: updatedAdmin });
    } catch (error) {
        console.error("Error updating admin profile", error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
});



router.put("/admin/:adminId/resetpassword", async (req, res) => {
    try {
        const adminId = req.params.adminId;
        if (!req.session.admin || req.session.admin.adminID.toString() !== adminId) {
            return res.status(401).json({ message: "Unauthorized: Admin not logged in or unauthorized to perform this action" });
        }

        const { oldPassword, newPassword, confirmNewPassword } = req.body;
        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        if (!newPassword !== confirmNewPassword) {
            return res.status(404).json({ message: "Both passwords must match!" });
        }

        const isPasswordMatch = await bcrypt.compare(oldPassword, admin.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Incorrect old password" });
        }

        admin.password = await bcrypt.hash(newPassword, 10);

        await admin.save();

        res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        console.error("Error resetting user password:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
  


export default router;