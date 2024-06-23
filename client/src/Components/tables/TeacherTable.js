import React from 'react';
import {  useNavigate } from 'react-router-dom';
import TableComponent from '../common/TableComponent';

const TeacherTable = ({ teachers, onDelete }) => {
  const navigate = useNavigate();
  
  const columns = ['Name', 'Gender', 'Date of Birth', 'Contact Details', 'Salary'];

  
  const transformedData = teachers.map((teacher) => ({
    'Name': teacher.name,
    'Gender': teacher.gender,
    'Date of Birth': teacher.dob,
    'Contact Details': teacher.contact,
    'Salary': teacher.salary,
    'id': teacher._id
  }));

  const EditTeacher =(id)=>{
    navigate(`/edit_teacher/${id}`)
  }

  return (
    <TableComponent columns={columns} data={transformedData} enablePagination={false} onDelete={onDelete} onEdit={EditTeacher} />
  );
};

export default TeacherTable;
