import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ClassAnalyticsGraph = ({ classDetails }) => {
  const chartRef = useRef(null);
  let chartInstance = null;

  useEffect(() => {
    renderChart();

    return () => {
      destroyChart();
    };
  }, []);

  useEffect(() => {
    if (chartInstance) {
      destroyChart();
      renderChart();
    }
  }, [classDetails]);

  const renderChart = () => {
    const maleCount = classDetails.maleStudents;
    const femaleCount = classDetails.femaleStudents;

    const chartData = {
      labels: ['Male', 'Female'],
      datasets: [{
        label: 'Number of Students',
        data: [maleCount, femaleCount], 
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 99, 132, 0.2)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1
      }]
    };

    const chartOptions = {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };

    const ctx = chartRef.current.getContext('2d');
    chartInstance = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: chartOptions
    });
  };

  const destroyChart = () => {
    if (chartInstance) {
      chartInstance.destroy();
      chartInstance = null;
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4 text-center">Class Graph</h2>
      <canvas ref={chartRef} className="w-full max-w-lg mx-auto" />
    </div>
  );
};

export default ClassAnalyticsGraph;
