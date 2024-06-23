import Student from "../models/Student.js";
import Class from "../models/Class.js";

// Controller to get all students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller to create a new student
const createStudent = async (req, res) => {
  try {
    const { name, gender, dob, contact, feesPaid, className } = req.body;

    // Find the class by className
    let classData = await Class.findOne({ className });

    // If class doesn't exist, create a new one
    if (!classData) {
      classData = await new Class({ className }).save();
    }

    // Extract the class ID
    const classId = classData._id;

    // Create a new student with class ID
    const newStudent = new Student({ name, gender, dob, contact, feesPaid, class: classId });
    const savedStudent = await newStudent.save();

    // Update the class document to include the new student's ID
    classData.students.push(savedStudent._id);
    await classData.save();

    res.status(201).json(savedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};




const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('class');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



const updateStudentById = async (req, res) => {
  try {
    
    let assignedClassId = req.body.className;

    let classExists = await Class.exists({ className: assignedClassId });

    if (!classExists) {
      const newClass = new Class({ className:assignedClassId });
      await newClass.save();
      assignedClassId = newClass._id;
    }

   
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { ...req.body, className: assignedClassId },
      { new: true }
    );

    
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    
    res.json(updatedStudent);
  } catch (err) {
    
    res.status(400).json({ message: err.message });
  }
};


const deleteStudentById = async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { createStudent, getStudentById, getAllStudents, updateStudentById, deleteStudentById };
