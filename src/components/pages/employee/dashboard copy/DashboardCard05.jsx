import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from "../../../utils/ApiConfig";

const DashboardCard05 = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaves = async () => {
      const token = localStorage.getItem('userToken');

      if (!token) {
        setError('User token not found.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/api/getleaves-byemploye`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setLeaves(response.data.data || []);
      } catch (err) {
        setError('Failed to fetch leave data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaves();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="col-span-full xl:col-span-6 bg-white ring shadow-xl ring-gray-100 rounded-lg overflow-hidden">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Leave Requests</h2>
      </header>
      <div className="p-4">
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-sm text-gray-600 dark:text-gray-300 rounded-lg shadow-sm">
            <thead className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/50 rounded-t-lg">
              <tr>
                <th className="p-3 text-left">Leave Type</th>
                <th className="p-3 text-center">Start Date</th>
                <th className="p-3 text-center">End Date</th>
                <th className="p-3 text-center">Hours</th>
                <th className="p-3 text-center">Reason</th>
                <th className="p-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {leaves.map((leave) => (
                <tr key={leave.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                  <td className="p-3 text-left font-medium text-gray-800 dark:text-gray-100">
                    {leave.leave_type}
                  </td>
                  <td className="p-3 text-center">{leave.start_date}</td>
                  <td className="p-3 text-center">{leave.end_date}</td>
                  <td className="p-3 text-center">{leave.hours ?? '-'}</td>
                  <td className="p-3 text-center">{leave.reason}</td>
                  <td className="p-3 text-center">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        leave.status === 'Approved'
                          ? 'bg-green-100 text-green-600'
                          : leave.status === 'Rejected'
                          ? 'bg-red-100 text-red-600'
                          : 'bg-yellow-100 text-yellow-600'
                      }`}
                    >
                      {leave.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard05;
