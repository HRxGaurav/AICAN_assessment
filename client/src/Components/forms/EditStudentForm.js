import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FormComponent from '../common/FormComponent';

const EditStudentForm = () => {
  const { id } = useParams();
  const [studentData, setStudentData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStudentDetail = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/get_students_by_id/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch student detail');
        }
        const data = await response.json();
        data.dob = data.dob.split('T')[0];
        setStudentData(data);
      } catch (error) {
        console.error('Error fetching student detail:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudentDetail();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!studentData) {
    return <div>No data found for student with ID {id}</div>;
  }

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
    { name: 'name', label: 'Name', required: true },
    { name: 'gender', label: 'Gender', type: 'dropdown', options: genderOptions, required: true },
    { name: 'dob', label: 'Date of Birth', type: 'date', required: true, value: studentData.dob },
    { name: 'contact', label: 'Contact', type: 'tel', required: true, value: studentData.contact },
    { name: 'feesPaid', label: 'Fees Paid', type: 'number', required: true, value: studentData.feesPaid },
    { name: 'className', label: 'Class', type: 'dropdown', options: classOptions, required: true, value: studentData.className },
  ];

  return (  
    <FormComponent
      fields={fields}
      apiUrl={`update_students_by_id/${id}`}
      initialData={studentData}
      titleHeading="Edit Student"
      submitType="PUT"
    />
  );
};

export default EditStudentForm;
