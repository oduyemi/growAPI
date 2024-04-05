"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const adminSchema = new mongoose_1.default.Schema({
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});
// adminSchema.pre<IAdmin>('save', async function (next: Function) {
//   if (!this.isModified('password')) return next(); 
//   const saltRounds = 10;
//   try {
//     const hashedPassword = await bcrypt.hash(this.password, saltRounds); 
//     this.password = hashedPassword;
//     return next();
//   } catch (error) {
//     return next(error);
//   }
// });
const Admin = mongoose_1.default.model("Admin", adminSchema);
exports.default = Admin;
