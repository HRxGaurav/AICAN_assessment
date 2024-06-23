import express from 'express';
import { getAllTeachers, createTeacher, getTeacherById, updateTeacherById, deleteTeacherById } from '../controllers/teacherController.js';

const router = express.Router();


router.get('/get_all_teachers', getAllTeachers);


router.post('/add_teachers', createTeacher);


router.get('/get_teachers_by_id/:id', getTeacherById);


router.put('/update_teachers_by_id/:id', updateTeacherById);


router.delete('/delete_teachers_by_id/:id', deleteTeacherById);

export default router;
