import React, { useState, useEffect, useContext } from 'react'; 
import DoughnutChart from '../../../charts/DoughnutChart';
import { GraphContext } from '../../../context/GraphContext';

// Import utilities
import { getCssVariable } from '../Dashutils/Utils';

function DashboardCard06() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Get graph data and API call function from context
  const { graphData, loading, error, fetchGraphData } = useContext(GraphContext);
  console.log("Graph Data Received:", graphData);

  // Fetch graph data when dates change
  useEffect(() => {
    if (startDate && endDate) {
      fetchGraphData(startDate, endDate);
    }
  }, [startDate, endDate]);

  // Convert time format (HH:MM) to decimal hours
  const timeToDecimal = (time) => {
    if (!time) return 0;
    const [hours, minutes] = time.split(':').map(Number);
    return hours + minutes / 60;
  };

  const safeGetCssVariable = (variable, fallback) => getCssVariable(variable) || fallback;

  const filteredChartData = graphData
    ? {
        labels: ['Billable Hours', 'Non-billable Hours', 'In-house Hours'],
        datasets: [
          {
            label: 'Working Hours',
            data: [
              timeToDecimal(graphData.total_billable_hours),
              timeToDecimal(graphData.total_nonbillable_hours),
              timeToDecimal(graphData.total_inhouse_hours),
            ],
            backgroundColor: [
              safeGetCssVariable('--color-violet-500', '#8b5cf6'),
              safeGetCssVariable('--color-sky-500', '#0ea5e9'),
              safeGetCssVariable('--color-violet-800', '#6d28d9'),
            ],
            hoverBackgroundColor: [
              safeGetCssVariable('--color-violet-600', '#7c3aed'),
              safeGetCssVariable('--color-sky-600', '#0284c7'),
              safeGetCssVariable('--color-violet-900', '#4c1d95'),
            ],
            borderWidth: 1,
          },
        ],
      }
    : null; 

  console.log("Filtered Chart Data:", filteredChartData);

  return (
    <div className="flex rounded-lg shadow-lg flex-col col-span-full sm:col-span-6 xl:col-span-6 bg-white shadow-xs rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 bg-blue-600  rounded-lg">
        <h2 className="font-semibold text-white ">Working Hours</h2>
      </header>

      <div className="px-5 py-4 flex gap-4">
        <input
          type="date"
          className="border px-2 py-1 rounded"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className="border px-2 py-1 rounded"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      
      {loading && <p>Loading data...</p>}
      {error && <p>Error: {error.message || "An unknown error occurred"}</p>}

      {filteredChartData ? (
        <DoughnutChart data={filteredChartData} width={389} height={260} />
      ) : (
        <p className=' font-bold text-red-500 text-center'>No data available for the selected date range</p>
      )}
    </div>
  );
}

export default DashboardCard06;
