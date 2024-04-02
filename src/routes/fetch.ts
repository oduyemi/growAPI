import express, { Request, Response } from "express";
import Admin, { IAdmin } from "../models/adminModel";
import MailingList, { IMailingList } from "../models/mailingListModel";

const router = express.Router();


router.get("/", (req: Request, res: Response) => {
    res.json({ message: "GrowAfrica!!" });
    });

router.get("/admin", async (req: Request, res: Response) => {
    try {
        const admins: IAdmin[] = await Admin.find();
        if (admins.length === 0) {
            res.status(404).json({ Message: "Admins not available" });
        } else {
            res.json({ data: admins });
        }
        } catch (error) {
        console.error("Error fetching data from the database", error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
});

    
router.get("/admin/:adminId", async (req: Request, res: Response) => {
    try {
        const adminId = req.params.adminId;
        const admin: IAdmin | null = await Admin.findById(adminId);
    
        if (!admin) {
        res.status(404).json({ Message: "Admin not found" });
        } else {
        res.json({ data: admin });
        }
    } catch (error) {
        console.error("Error fetching data from the database", error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
});
        
        


router.get("/contacts", async (req: Request, res: Response) => {
    try {
        const contacts: IMailingList[] = await MailingList.find();
        if (contacts.length === 0) {
            res.status(404).json({ Message: "Contacts not available" });
        } else {
            res.json({ data: contacts });
        }
        } catch (error) {

        console.error("Error fetching data from the database", error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
});

    
router.get("/contacts/:contactId", async (req: Request, res: Response) => {
    try {
        const contactId = req.params.contactId;
        const contact: IMailingList | null = await MailingList.findById(contactId);
    
        if (!contact) {
        res.status(404).json({ Message: "Contact not found" });
        } else {
        res.json({ data: contact });
        }
    } catch (error) {
        console.error("Error fetching data from the database", error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
});

router.get("/contact/emails", async (req: Request, res: Response) => {
    try {
        const emailsWithNames: { email: string, fullname: string }[] = await MailingList.find({}, { email: 1, fullname: 1 });

        if (emailsWithNames.length === 0) {
            res.status(404).json({ Message: "No emails found in the mailing list" });
        } else {
            res.json({ data: emailsWithNames });
        }
    } catch (error) {
        console.error("Error fetching data from the database", error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
});


router.get("/contact/numbers", async (req: Request, res: Response) => {
    try {
        const phonesWithNames: { phone: string, fullname: string }[] = await MailingList.find({}, { phone: 1, fullname: 1 });

        if (phonesWithNames.length === 0) {
            res.status(404).json({ Message: "No phone numbers found in the mailing list" });
        } else {
            res.json({ data: phonesWithNames });
        }
    } catch (error) {
        console.error("Error fetching data from the database", error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
});


router.get("/contact/shoppers", async (req: Request, res: Response) => {
    try {
        const shoppers: IMailingList[] = await MailingList.find({ shopperOrVendor: 'shopper' });

        if (shoppers.length === 0) {
            res.status(404).json({ Message: "No form inputs of shoppers found in the mailing list" });
        } else {
            res.json({ data: shoppers });
        }
    } catch (error) {
        console.error("Error fetching data from the database", error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
});


router.get("/contact/vendors", async (req: Request, res: Response) => {
    try {
        const vendors: IMailingList[] = await MailingList.find({ shopperOrVendor: 'vendor' });

        if (vendors.length === 0) {
            res.status(404).json({ Message: "No form inputs of vendors found in the mailing list" });
        } else {
            res.json({ data: vendors });
        }
    } catch (error) {
        console.error("Error fetching data from the database", error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
});

router.get("/contact/preference/email", async (req: Request, res: Response) => {
    try {
        const emailPreferences: IMailingList[] = await MailingList.find({ contactPreference: 'email' });

        if (emailPreferences.length === 0) {
            res.status(404).json({ Message: "No form inputs with email preference found in the mailing list" });
        } else {
            res.json({ data: emailPreferences });
        }
    } catch (error) {
        console.error("Error fetching data from the database", error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
});

router.get("/contact/preference/phone", async (req: Request, res: Response) => {
    try {
        const phonePreferences: IMailingList[] = await MailingList.find({ contactPreference: 'phone' });

        if (phonePreferences.length === 0) {
            res.status(404).json({ Message: "No form inputs with phone preference found in the mailing list" });
        } else {
            res.json({ data: phonePreferences });
        }
    } catch (error) {
        console.error("Error fetching data from the database", error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
});

router.get("/contact/preference/instagram", async (req: Request, res: Response) => {
    try {
        const instaPreferences: IMailingList[] = await MailingList.find({ contactPreference: 'instagram' });

        if (instaPreferences.length === 0) {
            res.status(404).json({ Message: "No form inputs with Instagram preference found in the mailing list" });
        } else {
            res.json({ data: instaPreferences });
        }
    } catch (error) {
        console.error("Error fetching data from the database", error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
});

router.get("/contact/preference/whatsapp", async (req: Request, res: Response) => {
    try {
        const whatsappPreferences: IMailingList[] = await MailingList.find({ contactPreference: 'whatsapp' });

        if (whatsappPreferences.length === 0) {
            res.status(404).json({ Message: "No form inputs with WhatsApp preference found in the mailing list" });
        } else {
            res.json({ data: whatsappPreferences });
        }
    } catch (error) {
        console.error("Error fetching data from the database", error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
});


export default router;