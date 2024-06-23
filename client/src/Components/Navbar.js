import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-background-grey p-4 shadow-md">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-black text-xl font-bold cursor-pointer" onClick={() => navigate('/')}>
            AICAN School Management App
          </h1>
          <div className="flex items-center space-x-4 bg-f8df8c">
            <h1
              className="text-black bg-background-yellow text-base font-bold cursor-pointer border p-2 px-3 rounded-md"
              onClick={() => navigate('/create_student')}
            >
              Add Student
            </h1>
            <h1
              className="text-black bg-background-yellow text-base font-bold cursor-pointer border p-2 px-3 rounded-md"
              onClick={() => navigate('/create_teacher')}
            >
              Add Teacher
            </h1>
            <h1
              className="text-black bg-background-yellow text-base font-bold cursor-pointer border p-2 px-3 rounded-md"
              onClick={() => navigate('/create_class')}
            >
              Add Class
            </h1>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
