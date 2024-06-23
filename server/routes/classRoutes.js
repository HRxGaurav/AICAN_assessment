import express from 'express';
import { getAllClasses, createClass, getClassById, updateClassById, deleteClassById } from '../controllers/classController.js';

const router = express.Router();


router.get('/get_all_classes', getAllClasses);


router.post('/add_classes', createClass);


router.get('/get_classes_by_id/:id', getClassById);


router.put('/update_classes_by_id/:id', updateClassById);


router.delete('/delete_classes_by_id/:id', deleteClassById);

export default router;
