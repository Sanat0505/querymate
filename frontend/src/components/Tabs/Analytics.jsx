import { Chart, registerables  } from "chart.js";
import { useEffect, useRef } from "react";
Chart.register(...registerables);

const Analytics = () => {

    const userGrowthRef = useRef(null);
    const querySubmissionRef = useRef(null);
    const userGrowthChart = useRef(null);
    const querySubmissionChart = useRef(null);
  
    useEffect(() => {
      // Destroy existing charts before creating new ones
      if (userGrowthChart.current) userGrowthChart.current.destroy();
      if (querySubmissionChart.current) querySubmissionChart.current.destroy();
  
      // User Growth Chart
      const userGrowthCtx = userGrowthRef.current.getContext('2d');
      userGrowthChart.current = new Chart(userGrowthCtx, {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April'], // X-axis labels
          datasets: [
            {
              label: 'New Users',
              data: [50, 120, 180, 240], // Y-axis data
              borderColor: '#ec4899', // Line color
              backgroundColor: '#fbcfe8', // Area fill color
              tension: 0.4, // Curve smoothing
              fill: true, // Fill below the line
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'User Growth Over Time',
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Time Period',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Number of Users',
              },
              beginAtZero: true,
            },
          },
        },
      });
  
      // Query Submission Trends Chart
      const querySubmissionCtx = querySubmissionRef.current.getContext('2d');
      querySubmissionChart.current = new Chart(querySubmissionCtx, {
        type: 'bar',
        data: {
          labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], // X-axis labels
          datasets: [
            {
              label: 'Queries Submitted',
              data: [20, 35, 50, 75], // Y-axis data
              backgroundColor: '#4c51bf', // Bar color
              borderColor: '#4c51bf', 
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Query Submission Trends',
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Time Period',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Number of Queries',
              },
              beginAtZero: true,
            },
          },
        },
      });
  
      // Cleanup to destroy charts when component unmounts or updates
      return () => {
        if (userGrowthChart.current) userGrowthChart.current.destroy();
        if (querySubmissionChart.current) querySubmissionChart.current.destroy();
      };
    }, []);


      
    return (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Analytics</h3>
  
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Active Users</h4>
            <p className="text-3xl font-bold text-primary-600">1,234</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">New Users This Week</h4>
            <p className="text-3xl font-bold text-primary-600">345</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Average Response Time</h4>
            <p className="text-3xl font-bold text-primary-600">2.3 hrs</p>
          </div>
        </div>
  
        {/* Charts */}
        <div className="flex flex-row flex-wrap gap-4 lg:gap-10">
        <div className="min-h-[20rem] lg:w-[32.5vw] bg-gray-200 dark:bg-gray-700 rounded-lg mb-6">
          <p className="text-center text-gray-500 dark:text-gray-400 p-4">User Growth Chart</p>
        <canvas ref={userGrowthRef}></canvas>
        </div>
  
        <div className="min-h-[20rem] lg:w-[32.5vw] bg-gray-200 dark:bg-gray-700 rounded-lg">
          <p className="text-center text-gray-500 dark:text-gray-400 p-4">Query Submission Trends</p>
          <canvas ref={querySubmissionRef}></canvas>
        </div>
        </div>
      </div>
    );
  };
  
  export default Analytics;
  