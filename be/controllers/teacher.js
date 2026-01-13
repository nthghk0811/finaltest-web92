import Teacher from '../models/Teacher.js';
import User from '../models/User.js';
import TeacherPosition from '../models/TeacherPosition.js';
// generate a random 10-digits string
const generateTeacherCode = () => {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
};

export const createTeacher = async (req, res) => {
  try {
    const { name, email, phoneNumber, address, identity, dob, positionId, degrees } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });


    const newUser = await User.create({ name, email, phoneNumber, address, identity, dob, role: 'TEACHER' });


    let code = generateTeacherCode();
    const check = await Teacher.findOne({ code });


    const newTeacher = await Teacher.create({
      userId: newUser._id,
      code: code,
      teacherPositionsId: [positionId],
      degrees: degrees || []
    });

    res.status(201).json({ success: true, data: { ...newUser._doc, ...newTeacher._doc } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTeachers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const teachers = await Teacher.find({ isActive: true })
      .populate('userId', 'name email phoneNumber address')
      .populate('teacherPositionsId', 'name code')
      .skip(skip)
      .limit(limit);

    const total = await Teacher.countDocuments({ isActive: true });

    const data = teachers.map(t => ({
      code: t.code,
      name: t.userId?.name,
      email: t.userId?.email,
      phoneNumber: t.userId?.phoneNumber,
      address: t.userId?.address,
      isActive: t.isActive,
      positions: t.teacherPositionsId,
      degrees: t.degrees
    }));

    res.json({
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export const createPosition = async (req, res) => {
  try {
    const { code, name, des, isActive } = req.body;
    const check = await TeacherPosition.findOne({ code });
    if (check) return res.status(400).json({ message: "Code must be unique" });

    const newPos = await TeacherPosition.create({ code, name, des, isActive });
    res.status(201).json(newPos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getPositions = async (req, res) => {
  try {
    const positions = await TeacherPosition.find({ isActive: true });
    res.json(positions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};