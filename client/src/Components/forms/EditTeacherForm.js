import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FormComponent from '../common/FormComponent';

const EditTeacherForm = () => {
  const { id } = useParams();
  const [teacherData, setTeacherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTeacherDetail = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/get_teachers_by_id/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch teacher detail');
        }
        const data = await response.json();
        data.dob = data.dob.split('T')[0];
        setTeacherData(data);
      } catch (error) {
        console.error('Error fetching teacher detail:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeacherDetail();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!teacherData) {
    return <div>No data found for teacher with ID {id}</div>;
  }

  const genderOptions = [
    { label: "Select", value: "" },
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' }
  ];

  const fields = [
    { name: 'name', label: 'Name', required: true, value: teacherData.name },
    { name: 'gender', label: 'Gender', type: 'dropdown', options: genderOptions, required: true, value: teacherData.gender },
    { name: 'dob', label: 'Date of Birth', type: 'date', required: true, value: teacherData.dob },
    { name: 'contact', label: 'Contact', type: 'tel', required: true, value: teacherData.contact },
    { name: 'salary', label: 'Salary', type: 'number', required: true, value: teacherData.salary },
    { name: 'assignedClass', label: 'Assigned Class', required: true, value: teacherData.assignedClass },
  ];

  return (
    <FormComponent
      fields={fields}
      apiUrl={`update_teachers_by_id/${id}`}
      initialData={teacherData}
      titleHeading="Edit Teacher"
      submitType="PUT"
    />
  );
};

export default EditTeacherForm;
