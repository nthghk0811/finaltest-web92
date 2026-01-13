import mongoose from 'mongoose';

const TeacherSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  teacherPositionsId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TeacherPosition' }],
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  code: { type: String, unique: true },
  startDate: Date,
  endDate: Date,
  degrees: [{
    type: { type: String },
    school: String,
    major: String,
    year: Number,
    isGraduated: Boolean
  }]
});

const Teacher = mongoose.model('Teacher', TeacherSchema, 'teachers');

export default Teacher;