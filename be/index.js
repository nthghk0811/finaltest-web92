import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import {createTeacher, getTeachers, createPosition, getPositions} from './controllers/teacher.js';
await mongoose.connect('mongodb+srv://nguyenhoanghai811_db_user:Hainguyen070811@final.gzht5bg.mongodb.net/?appName=final');
const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));


app.get('/teachers', getTeachers);
app.post('/teachers', createTeacher);
app.get('/teacher-positions', getPositions);
app.post('/teacher-positions', createPosition);

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
