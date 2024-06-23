import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    
  },
  dob: {
    type: Date,
  },
  contact: {
    type: String,
  },
  salary: {
  },
  assignedClass: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class'
  }
});

const Teacher = mongoose.model('Teacher', teacherSchema);

export default Teacher;
