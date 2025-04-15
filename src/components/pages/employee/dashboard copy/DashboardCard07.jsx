import React from 'react';
import { useUserContext } from "../../../context/UserContext";

function DashboardCard07() {
    const { performanceSheets, loading } = useUserContext();

    // Sort the data by date and get the latest 7 records
    const sortedSheets = performanceSheets?.data?.sheets
        ? performanceSheets.data.sheets
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 7)
        : [];

    return (
        <div className="col-span-full xl:col-span-6 bg-white ring shadow-xl ring-gray-100 rounded-lg overflow-hidden">
            <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Top Performance Sheets</h2>
            </header>
            <div className="p-4">
                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="table-auto w-full text-sm text-gray-600 dark:text-gray-300 rounded-lg shadow-sm">
                        {/* Table header */}
                        <thead className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/50 rounded-t-lg">
                            <tr>
                                <th className="p-3 text-left">
                                    <div className="font-semibold">Project Name</div>
                                </th>
                                <th className="p-3 text-center">
                                    <div className="font-semibold">Client Name</div>
                                </th>
                                <th className="p-3 text-center">
                                    <div className="font-semibold">Time Spent</div>
                                </th>
                                <th className="p-3 text-center">
                                    <div className="font-semibold">Work Type</div>
                                </th>
                                <th className="p-3 text-center">
                                    <div className="font-semibold">Status</div>
                                </th>
                            </tr>
                        </thead>
                        {/* Table body */}
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {sortedSheets.map((sheet) => (
                                <tr key={sheet.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                                    <td className="p-3 flex items-center space-x-3">
                                        <svg className="shrink-0 w-6 h-6 text-blue-500" viewBox="0 0 36 36">
                                            <circle fill="#24292E" cx="18" cy="18" r="18" />
                                            <path
                                                d="M18 10.2c-4.4 0-8 3.6-8 8 0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V24c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6-.1-4.4-3.7-8-8.1-8z"
                                                fill="#FFF"
                                            />
                                        </svg>
                                        <span className="text-gray-800 dark:text-gray-100 font-medium">{sheet.project_name}</span>
                                    </td>
                                    <td className="p-3 text-center">{sheet.client_name}</td>
                                    <td className="p-3 text-center">{sheet.time}</td>
                                    <td className="p-3 text-center">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${sheet.work_type === 'WFO' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                                            {sheet.work_type}
                                        </span>
                                    </td>
                                    <td className="p-3 text-center">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${sheet.status === 'approved' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                                            {sheet.status}
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
}

export default DashboardCard07;
  