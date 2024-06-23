import React, { useState, useEffect } from 'react';
import FormComponent from '../common/FormComponent';

const ClassForm = () => {
  const [teachers, setTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/get_all_teachers`);
        if (!response.ok) {
          throw new Error('Failed to fetch teachers');
        }
        const data = await response.json();
        const teachersWithOptions = [
          { label: 'Will decide later', value: null },
          ...data.map(teacher => ({ label: teacher.name, value: teacher._id }))
        ];
        setTeachers(teachersWithOptions);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  const fields = [
    { name: 'className', label: 'Class*', type: 'text', required: true },
    { name: 'year', label: 'Year', type: 'number', required: true },
    { name: 'teacher', label: 'Teacher', type: 'dropdown', options: teachers },
    { name: 'studentFees', label: 'Student Fees', type: 'number', required: true }
  ];

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <FormComponent
          fields={fields}
          apiUrl="add_classes"
          titleHeading="Add Class"
          submitType="POST"
        />
      )}
    </div>
  );
};

export default ClassForm;
