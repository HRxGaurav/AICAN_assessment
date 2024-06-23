import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ClassAnalyticsData from '../Components/analytics/ClassAnalyticsData';
import ClassAnalyticsGraph from '../Components/analytics/ClassAnalyticsGraph';
import FinancialAnalyticsPage from './FinancialAnalyticsPage';

const ClassAnalyticsPage = () => {
  const { id } = useParams();
  const [classDetails, setClassDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/analytics_class/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch class details');
        }
        const data = await response.json();
        setClassDetails(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchClassDetails();
  }, [id]);

  return (
    <>
    <FinancialAnalyticsPage/>
    <div className="flex justify-center">
      <div className="w-1/2 mr-4">
        {error && <p>Error fetching class details: {error}</p>}
        {(!classDetails ) ? (
          <p>Insufficient data to show analytics. Please add data of teacher and students.</p>
        ) : (
          <ClassAnalyticsData classDetails={classDetails} />
        )}
      </div>
      <div className="w-1/2 ml-4 mt-6">
        {classDetails && (
          <ClassAnalyticsGraph classDetails={classDetails} />
        )}
      </div>
    </div>
    
      
    </>
  );
};

export default ClassAnalyticsPage;
