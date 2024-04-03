import mongoose, { Schema, Document } from "mongoose";
import bcrypt from 'bcrypt';

export interface IAdmin extends Document {
  admin_id: mongoose.Types.ObjectId;
  fname: string;
  lname: string;
  email: string;
  phone: string;
  password: string;
  createdAt: Date;
}

const adminSchema: Schema = new mongoose.Schema({
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

const Admin = mongoose.model<IAdmin>("Admin", adminSchema);

export default Admin;
