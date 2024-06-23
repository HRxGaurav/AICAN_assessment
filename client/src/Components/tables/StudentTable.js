import React from 'react';
import {  useNavigate } from 'react-router-dom';
import TableComponent from '../common/TableComponent';

const StudentTable = ({ students, onDelete }) => {
  
  const navigate = useNavigate();
  const columns = ['Name', 'Gender', 'Date of Birth', 'Contact Details', 'Fees Paid'];

  
  const transformedData = students.map((student) => ({
    'Name': student.name,
    'Gender': student.gender,
    'Date of Birth': student.dob,
    'Contact Details': student.contact,
    'Fees Paid': student.feesPaid,
    'id': student._id
  }));

  const EditStudent =(id)=>{
    navigate(`/edit_student/${id}`)
  }

  return (
    <TableComponent columns={columns} data={transformedData} pageSize={10} enablePagination={true} onDelete={onDelete} onEdit={EditStudent}/>
  );
};

export default StudentTable;
