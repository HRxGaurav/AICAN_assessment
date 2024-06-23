import Teacher from "../models/Teacher.js";
import Class from '../models/Class.js';


const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const createTeacher = async (req, res) => {
  try {
    const { name, gender, dob, contact, salary, assignedClass } = req.body;

    
    let classId;
    let existingClass = await Class.findOne({ className: assignedClass });

    if (!existingClass) {
      
      const newClass = new Class({ className: assignedClass });
      existingClass = await newClass.save();
    }

    classId = existingClass._id;

    
    await Teacher.updateOne({ assignedClass: classId }, { $unset: { assignedClass: 1 } });

   
    const newTeacherData = { name, gender, dob, contact, salary, assignedClass: classId };

    
    const newTeacher = new Teacher(newTeacherData);
    const savedTeacher = await newTeacher.save();
    
    
    await Class.findByIdAndUpdate(classId, { teacher: savedTeacher._id });

    res.status(201).json(savedTeacher);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


const getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id).populate('assignedClass');
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.json(teacher);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



const updateTeacherById = async (req, res) => {
  try {
    let assignedClass = req.body.assignedClass; 
    let classExists = await Class.exists({ className: assignedClass }); 
    let assignedClassId = classExists._id

    if (!classExists) {
      
      const newClass = new Class({ className: assignedClass });
      await newClass.save();
      assignedClassId = newClass._id;
    }

    
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      { ...req.body, assignedClass: assignedClassId },
      { new: true }
    );

    if (!updatedTeacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.json(updatedTeacher);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


const deleteTeacherById = async (req, res) => {
  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!deletedTeacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.json({ message: 'Teacher deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { createTeacher, getTeacherById, getAllTeachers, updateTeacherById, deleteTeacherById };
