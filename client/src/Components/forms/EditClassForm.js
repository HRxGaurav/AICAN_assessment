import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FormComponent from '../common/FormComponent';

const EditClassForm = () => {
  const { id } = useParams();
  const [classData, setClassData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchClassDetail = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/get_classes_by_id/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch class detail');
        }
        const data = await response.json();
        setClassData(data);
      } catch (error) {
        console.error('Error fetching class detail:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClassDetail();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!classData) {
    return <div>No data found for class with ID {id}</div>;
  }

  const fields = [
    { name: 'className', label: 'Class Name', required: true, value: classData.className },
    { name: 'year', label: 'Year', type: 'number', required: true, value: classData.year },
    { name: 'teacher', label: 'Teacher', required: true, value: classData.teacher },
    { name: 'studentFees', label: 'Student Fees', type: 'number', required: true, value: classData.studentFees },
  ];

  return (
    <FormComponent
      fields={fields}
      apiUrl={`update_classes_by_id/${id}`}
      initialData={classData}
      titleHeading="Edit Class"
      submitType="PUT"
    />
  );
};

export default EditClassForm;
