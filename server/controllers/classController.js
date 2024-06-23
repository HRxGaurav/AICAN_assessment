import Class from "../models/Class.js";
import Teacher from "../models/Teacher.js";


const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find()
      .populate('teacher') 
      .populate('students'); 
    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



const createClass = async (req, res) => {
  try {
    const { className, year, teacher, studentFees, students } = req.body;
    
    
    const existingClass = await Class.findOne({ className });
    if (existingClass) {
      return res.status(409).json({ message: 'Class already exists' });
    }
   
   
    if (className < 1 || className > 12) {
      return res.status(422).json({ message: 'Class must be between 1 and 12' });
    }

    
    let teacherId;
    if (teacher) {
      const existingTeacher = await Teacher.findOne({ name: teacher });
      if (existingTeacher) {
        teacherId = existingTeacher._id;
      } else {
        
        const newTeacher = new Teacher({ name: teacher });
        const savedTeacher = await newTeacher.save();
        teacherId = savedTeacher._id;
      }
    }

    
    const newClassData = { className, year, teacher: teacherId, studentFees, students };
    const newClass = new Class(newClassData);
    const savedClass = await newClass.save();
    res.status(201).json({ message: 'Class added successfully', class: savedClass });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};





const updateClassById = async (req, res) => {
  try {
    const updatedClass = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedClass) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.json(updatedClass);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


const getClassById = async (req, res) => {
  try {
    const classItem = await Class.findById(req.params.id)
      .populate({
        path: 'teacher',
        select: '-__v', 
        populate: {
          path: 'contact', 
          select: '-_id'
        }
      }) 
      .populate({
        path: 'students',
        select: '-__v', 
        populate: {
          path: 'contact', 
          select: '-_id' 
        }
      }); 
      
    
    if (!classItem) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.json(classItem);
  } catch (err) {
    console.error('Error fetching class by ID:', err);
    res.status(500).json({ message: err.message });
  }
};




const deleteClassById = async (req, res) => {
  try {
    const deletedClass = await Class.findByIdAndDelete(req.params.id);
    if (!deletedClass) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.json({ message: 'Class deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { createClass, getClassById, getAllClasses, updateClassById, deleteClassById };
