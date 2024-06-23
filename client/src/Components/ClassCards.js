import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from './Models/Loader';

const ClassCards = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/get_all_classes`);
        if (!response.ok) {
          throw new Error('Failed to fetch classes');
        }
        const data = await response.json();
        setClasses(data);
      } catch (error) {
        console.error('Error fetching classes:', error);
      } finally {
        setIsLoading(false); 
      }
    };
    fetchClasses();
  }, []);

  return (
    <div className="container mx-auto mt-8 px-24">
      <h2 className="text-2xl font-bold mb-4 text-center text-black">Classes</h2>
      {isLoading ? ( 
        <Loader />
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {classes.map((classItem) => (
            <div key={classItem._id} className="bg-white p-4 rounded shadow flex flex-col items-center cursor-pointer" onClick={() => navigate(`class/${classItem._id}`)}>
              <h3 className="text-lg font-semibold mb-2">{classItem.className}</h3>
              {classItem.year && <p>Year: {classItem.year}</p>}
              {classItem.teacher && <p>Assigned teacher: {classItem.teacher.name}</p>}
            </div>
          ))}
          <div className="bg-background-yellow  p-4 rounded shadow flex items-center justify-center cursor-pointer" onClick={() => navigate('/create_class')}>
            <button className="text-black text-lg font-bold">Add Class</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassCards;
