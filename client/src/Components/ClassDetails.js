import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from './Models/Loader';
import toast from 'react-hot-toast';
import TeacherTable from './tables/TeacherTable';
import StudentTable from './tables/StudentTable';

const ClassDetail = () => {
  const [classDetail, setClassDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchClassDetail = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND}/get_classes_by_id/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch class detail');
      }
      const data = await response.json();
      setClassDetail(data);
    } catch (error) {
      console.error('Error fetching class detail:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {

    fetchClassDetail(); 
  }, [id]);

  const handleEditClass = () => {
    navigate(`/edit_class/${id}`); 
  };

  const handleDeleteClass = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND}/delete_classes_by_id/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete class');
      }
      navigate('/');
      toast.success('Deleted successfully');
    } catch (error) {
      console.error('Error deleting class:', error);
    }
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND}/delete_students_by_id/${studentId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete student');
      }
     
      fetchClassDetail();
      toast.success('Student deleted successfully');
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };
  
  const handleDeleteTeacher = async (teacherId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND}/delete_teachers_by_id/${teacherId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete teacher');
      }
      
      fetchClassDetail();
      toast.success('Teacher deleted successfully');
    } catch (error) {
      console.error('Error deleting teacher:', error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!classDetail) {
    return <div>Class detail not found</div>;
  }

  return (
    <div className="relative mt-5 mx-5 p-6 border rounded-lg shadow-md bg-white">
      <div className="absolute top-5 right-10 mt-3 -mr-3 space-x-2">
        <button onClick={() => navigate(`/analytics_class/${id}`)} className="bg-green-500 text-white px-4 py-2 rounded-md transition duration-300">Get Analytics</button>
        <button onClick={handleEditClass} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300">Edit Class</button>
        <button onClick={handleDeleteClass} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-300">Delete Class</button>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4 text-center">Class Detail</h2>
        <p className="text-lg font-bold mb-4 text-center">Class Name: {classDetail.className}</p>
        {classDetail.year && <p className="text-lg font-bold mb-4 text-center">Year: {classDetail.year}</p>}
        {classDetail.teacher && (
          <div className="mb-4">
            <h3 className="text-lg font-bold mb-2 text-center">Assigned Teacher</h3>
            <TeacherTable teachers={[classDetail.teacher]} onDelete={handleDeleteTeacher}/>
          </div>
        )}
        {classDetail.students.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-bold mb-2 text-center">Students</h3>
            <StudentTable students={classDetail.students} onDelete={handleDeleteStudent} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassDetail;
