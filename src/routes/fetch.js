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
const mailingListModel_1 = __importDefault(require("../models/mailingListModel"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.json({ message: "GrowAfrica!!" });
});
router.get("/admin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admins = yield adminModel_1.default.find();
        if (admins.length === 0) {
            res.status(404).json({ Message: "Admins not available" });
        }
        else {
            res.json({ data: admins });
        }
    }
    catch (error) {
        console.error("Error fetching data from the database", error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
}));
router.get("/admin/:adminId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminId = req.params.adminId;
        const admin = yield adminModel_1.default.findById(adminId);
        if (!admin) {
            res.status(404).json({ Message: "Admin not found" });
        }
        else {
            res.json({ data: admin });
        }
    }
    catch (error) {
        console.error("Error fetching data from the database", error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
}));
router.get("/contacts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contacts = yield mailingListModel_1.default.find();
        if (contacts.length === 0) {
            res.status(404).json({ Message: "Contacts not available" });
        }
        else {
            res.json({ data: contacts });
        }
    }
    catch (error) {
        console.error("Error fetching data from the database", error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
}));
router.get("/contacts/:contactId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contactId = req.params.contactId;
        const contact = yield mailingListModel_1.default.findById(contactId);
        if (!contact) {
            res.status(404).json({ Message: "Contact not found" });
        }
        else {
            res.json({ data: contact });
        }
    }
    catch (error) {
        console.error("Error fetching data from the database", error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
}));
router.get("/contact/emails", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const emailsWithNames = yield mailingListModel_1.default.find({}, { email: 1, fullname: 1 });
        if (emailsWithNames.length === 0) {
            res.status(404).json({ Message: "No emails found in the mailing list" });
        }
        else {
            res.json({ data: emailsWithNames });
        }
    }
    catch (error) {
        console.error("Error fetching data from the database", error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
}));
router.get("/contact/numbers", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const phonesWithNames = yield mailingListModel_1.default.find({}, { phone: 1, fullname: 1 });
        if (phonesWithNames.length === 0) {
            res.status(404).json({ Message: "No phone numbers found in the mailing list" });
        }
        else {
            res.json({ data: phonesWithNames });
        }
    }
    catch (error) {
        console.error("Error fetching data from the database", error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
}));
router.get("/contact/shoppers", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shoppers = yield mailingListModel_1.default.find({ shopperOrVendor: 'shopper' });
        if (shoppers.length === 0) {
            res.status(404).json({ Message: "No form inputs of shoppers found in the mailing list" });
        }
        else {
            res.json({ data: shoppers });
        }
    }
    catch (error) {
        console.error("Error fetching data from the database", error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
}));
router.get("/contact/vendors", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vendors = yield mailingListModel_1.default.find({ shopperOrVendor: 'vendor' });
        if (vendors.length === 0) {
            res.status(404).json({ Message: "No form inputs of vendors found in the mailing list" });
        }
        else {
            res.json({ data: vendors });
        }
    }
    catch (error) {
        console.error("Error fetching data from the database", error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
}));
router.get("/contact/preference/email", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const emailPreferences = yield mailingListModel_1.default.find({ contactPreference: 'email' });
        if (emailPreferences.length === 0) {
            res.status(404).json({ Message: "No form inputs with email preference found in the mailing list" });
        }
        else {
            res.json({ data: emailPreferences });
        }
    }
    catch (error) {
        console.error("Error fetching data from the database", error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
}));
router.get("/contact/preference/phone", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const phonePreferences = yield mailingListModel_1.default.find({ contactPreference: 'phone' });
        if (phonePreferences.length === 0) {
            res.status(404).json({ Message: "No form inputs with phone preference found in the mailing list" });
        }
        else {
            res.json({ data: phonePreferences });
        }
    }
    catch (error) {
        console.error("Error fetching data from the database", error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
}));
router.get("/contact/preference/whatsapp", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const whatsappPreferences = yield mailingListModel_1.default.find({ contactPreference: 'whatsapp' });
        if (whatsappPreferences.length === 0) {
            res.status(404).json({ Message: "No form inputs with WhatsApp preference found in the mailing list" });
        }
        else {
            res.json({ data: whatsappPreferences });
        }
    }
    catch (error) {
        console.error("Error fetching data from the database", error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
}));
exports.default = router;
