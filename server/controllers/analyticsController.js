
import Class from '../models/Class.js';
import Teacher from '../models/Teacher.js';
import Student from '../models/Student.js';


const getClassAnalytics = async (req, res) => {
  try {
    const classId = req.params.id;
    
    const classDetails = await Class.findById(classId).populate('teacher').populate('students');
    
    let maleStudents = 0;
    let femaleStudents = 0;
    for (const student of classDetails.students) {
      if (student.gender === 'Male') {
        maleStudents++;
      } else if (student.gender === 'Female') {
        femaleStudents++;
      }
    }

    const analytics = {
      classDetails: classDetails,
      maleStudents: maleStudents,
      femaleStudents: femaleStudents
    };

    res.json(analytics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getFinancialAnalytics = async (req, res) => {
  try {
    
    const totalSalary = await Teacher.aggregate([
      { $group: { _id: null, totalSalary: { $sum: '$salary' } } }
    ]);

    
    const totalFees = await Student.aggregate([
      { $group: { _id: null, totalFees: { $sum: '$feesPaid' } } }
    ]);

    
    const analytics = {
      totalSalary: totalSalary.length > 0 ? totalSalary[0].totalSalary : 0,
      totalFees: totalFees.length > 0 ? totalFees[0].totalFees : 0
    };

    res.json(analytics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { getClassAnalytics, getFinancialAnalytics };
