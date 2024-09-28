import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: { type: String, enum: ['active', 'blocked'], default: 'active' },
    registrationDate: { type: Date, default: Date.now },
    lastLogin: { type: Date, default: Date.now }
  });

  const User = mongoose.model('User', userSchema);

  export default User;