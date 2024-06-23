import React from 'react';

const ClassAnalyticsData = ({ classDetails }) => {
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
  };

  return (
    <div className="p-4 ">
      <h2 className="text-xl font-bold mb-4 text-center">Class Analytics</h2>
      <div className="bg-white rounded shadow p-4">
        <h3 className="text-lg font-semibold mb-2">Class Details</h3>
        <div className="mb-4">
          <span className="font-semibold">Class :</span>
          <span className="ml-2">{classDetails.classDetails.className}</span>
        </div>
        <div className="mb-4">
          <span className="font-semibold">Year :</span>
          <span className="ml-2">{classDetails.classDetails.year}</span>
        </div>
        <div className="mb-4">
          <span className="font-semibold">Teachers : </span>
          <span>{classDetails.classDetails.teacher.name}</span>
        </div>
        <div className="mb-4">
          <span className="font-semibold">Students:</span>
          {classDetails.classDetails.students && classDetails.classDetails.students.length > 0 ? (
            <ul className="mx-16">
              {classDetails.classDetails.students.map((student) => (
                <li key={student._id}>
                  {student.name}
                  {student.dob && ` (DOB : ${formatDate(student.dob)})`}
                </li>
              ))}
            </ul>
          ) : (
            <p>No students data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassAnalyticsData;
