import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
  className: {
    type: Number,
    required: true
  },
  year: {
    type: Number
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher'
  },
  studentFees: {
    type: Number
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }]
});


classSchema.path('students').validate(function(value) {
  return value.length <= 50;
}, 'Maximum 50 students allowed in the class.');

const Class = mongoose.model('Class', classSchema);

export default Class;

