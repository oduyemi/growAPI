"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminModel_1 = __importDefault(require("../models/adminModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = express_1.default.Router();
router.put("/admin/:adminId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminId = req.params.adminId;
        const updatedAdminData = req.body;
        const requiredFields = ["fname", "lname", "email", "phone", "password"];
        const missingFields = requiredFields.filter(field => !(field in updatedAdminData));
        if (missingFields.length > 0) {
            return res.status(400).json({ message: `Missing required fields: ${missingFields.join(", ")}` });
        }
        const updatedAdmin = yield adminModel_1.default.findByIdAndUpdate(adminId, updatedAdminData, { new: true });
        if (!updatedAdmin) {
            return res.status(404).json({ Message: "Admin not found" });
        }
        res.json({ data: updatedAdmin });
    }
    catch (error) {
        console.error("Error updating admin profile", error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
}));
router.put("/admin/:adminId/resetpassword", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminId = req.params.adminId;
        if (!req.session.admin || req.session.admin.adminID.toString() !== adminId) {
            return res.status(401).json({ message: "Unauthorized: Admin not logged in or unauthorized to perform this action" });
        }
        const { oldPassword, newPassword, confirmNewPassword } = req.body;
        const admin = yield adminModel_1.default.findById(adminId);
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        if (!newPassword !== confirmNewPassword) {
            return res.status(404).json({ message: "Both passwords must match!" });
        }
        const isPasswordMatch = yield bcrypt_1.default.compare(oldPassword, admin.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Incorrect old password" });
        }
        admin.password = yield bcrypt_1.default.hash(newPassword, 10);
        yield admin.save();
        res.status(200).json({ message: "Password reset successfully" });
    }
    catch (error) {
        console.error("Error resetting user password:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
exports.default = router;
