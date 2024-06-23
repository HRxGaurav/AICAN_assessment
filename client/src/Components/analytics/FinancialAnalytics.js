import React, { useState, useEffect } from 'react';

const FinancialAnalytics = () => {
  const [financialData, setFinancialData] = useState(null);
  const [error, setError] = useState(null);
  const [view, setView] = useState('monthly');
  const [selectedMonth, setSelectedMonth] = useState(''); 
  const [selectedYear, setSelectedYear] = useState(''); 

  useEffect(() => {
    const fetchFinancialData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/analytics_financial`);
        if (!response.ok) {
          throw new Error('Failed to fetch financial analytics data');
        }
        const data = await response.json();
        setFinancialData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchFinancialData();
  }, []);

  return (
    <div className="p-4">
      {error && <p>Error fetching financial analytics data: {error}</p>}

      
      {financialData && (

        
        <div>
          <h2 className="text-xl font-bold mb-4 text-center">Financial Analytics</h2>

          <>
          <div className="flex space-x-4 mt-4">
        <button
          className={`px-4 py-2 rounded ${view === 'monthly' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setView('monthly')}
        >
          Monthly View
        </button>
        <button
          className={`px-4 py-2 rounded ${view === 'yearly' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setView('yearly')}
        >
          Yearly View
        </button>
      </div>
      {view === 'monthly' && (
        <div className="flex space-x-4 mt-4">
          <select
            className="px-4 py-2 rounded border border-gray-300"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">Select Month</option>
            
          </select>
          <select
            className="px-4 py-2 rounded border border-gray-300"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">Select Year</option>
            
          </select>
        </div>
      )}
          
          </>
          <div className="bg-white rounded shadow p-4">
            <h3 className="text-lg font-semibold mb-2">Total Salary</h3>
            <div className="border-t border-gray-300 mt-2 pt-2">
              <span className="font-semibold">Total Salary:</span>
              <span className="ml-2">Rs {financialData.totalSalary}</span>
            </div>
          </div>
          <div className="bg-white rounded shadow p-4 mt-4">
            <h3 className="text-lg font-semibold mb-2">Total Fees</h3>
            <div className="border-t border-gray-300 mt-2 pt-2">
              <span className="font-semibold">Total Fees:</span>
              <span className="ml-2">Rs {financialData.totalFees}</span>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default FinancialAnalytics;
