import express from 'express';
import { getAllStudents, createStudent, getStudentById, updateStudentById, deleteStudentById } from '../controllers/studentController.js';

const router = express.Router();


router.get('/get_all_students', getAllStudents);


router.post('/add_students', createStudent);


router.get('/get_students_by_id/:id', getStudentById);


router.put('/update_students_by_id/:id', updateStudentById);


router.delete('/delete_students_by_id/:id', deleteStudentById);

export default router;
