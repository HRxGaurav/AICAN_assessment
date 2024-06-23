import React from 'react';
import FormComponent from '../common/FormComponent';

const StudentForm = () => {

  const genderOptions = [
    { label: "Select", value: "" },
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' }
  ];
  
  const classOptions = [
    { label: "Select", value: "" },
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' },
    { label: '10', value: '10' },
    { label: '11', value: '11' },
    { label: '12', value: '12'}
    
  ];


  const fields = [
    { label: 'Name', name: 'name', required: true },
    { label: 'Gender', name: 'gender', type: 'dropdown', options: genderOptions, required: true },
    { label: 'Date of Birth', name: 'dob', type: 'date', required: true },
    { label: 'Contact', name: 'contact', type: 'tel', required: true },
    { label: 'Fees Paid', name: 'feesPaid', type: 'number', required: true },
    { label: 'Class', name: 'className', type: 'dropdown', options: classOptions, required: true }, 
  ];

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <FormComponent fields={fields} apiUrl='add_students' titleHeading="Add Student" submitType="POST" />
    </div>
  );
};

export default StudentForm;
