import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  phoneNumber: String,
  address: String,
  identity: String, // CCCD
  dob: Date,
  isDeleted: { type: Boolean, default: false },
  role: { type: String, enum: ['STUDENT', 'TEACHER', 'ADMIN'], default: 'TEACHER' }
});

const User = mongoose.model('User', UserSchema, 'users');

export default User;