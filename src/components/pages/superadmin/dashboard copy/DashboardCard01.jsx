import React, { useState, useEffect, useContext } from 'react'; 
import DoughnutChart from '../../../charts/DoughnutChart';
import { GraphContext } from '../../../context/GraphContext';
import { getCssVariable } from '../Dashutils/Utils';
import { useProject } from "../../../context/ProjectContext";

function DashboardCard01() {
  const [selectedProject, setSelectedProject] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { projects } = useProject();
  const { fetchWorkingHours, workingHours, loading, error } = useContext(GraphContext);

  useEffect(() => {
    if (selectedProject) {
      fetchWorkingHours(selectedProject);
    }
  }, [selectedProject]);

  const timeToDecimal = (time) => {
    if (!time || time === "00:00") return 0;
    const [hours, minutes] = time.split(':').map(Number);
    return hours + minutes / 60;
  };

  const safeGetCssVariable = (variable, fallback) => getCssVariable(variable) || fallback;

  const hasValidData =
    workingHours &&
    (workingHours.total_billable_hours !== "00:00" ||
     workingHours.total_nonbillable_hours !== "00:00" ||
     workingHours.total_inhouse_hours !== "00:00");

  const filteredChartData = hasValidData
    ? {
        labels: ['Billable Hours', 'Non-billable Hours', 'In-house Hours'],
        datasets: [
          {
            label: 'Working Hours',
            data: [
              timeToDecimal(workingHours.total_billable_hours),
              timeToDecimal(workingHours.total_nonbillable_hours),
              timeToDecimal(workingHours.total_inhouse_hours),
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

  const filteredProjects = projects?.filter((p) =>
    p.project_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex rounded-lg shadow-lg flex-col col-span-full sm:col-span-6 xl:col-span-6 bg-white shadow-xs rounded-xl">
      <header className="px-5 py-4 rounded-lg bg-blue-600 border-b border-gray-100 flex justify-between items-center">
        <h2 className="font-semibold text-white">Working Hours</h2>

        <div className="relative w-64">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full bg-white text-black px-3 py-2 rounded border"
          >
            {selectedProject
              ? projects.find((p) => p.id === selectedProject)?.project_name
              : 'Select Project'}
          </button>

          {isDropdownOpen && (
            <div className="absolute w-full mt-1 bg-white shadow rounded z-20">
              <input
                type="text"
                placeholder="Search project..."
                className="w-full p-2 border-b outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <ul className="max-h-40 overflow-y-auto">
                {filteredProjects?.length > 0 ? (
                  filteredProjects.map((project) => (
                    <li
                      key={project.id}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSelectedProject(project.id);
                        setIsDropdownOpen(false);
                        setSearchTerm('');
                      }}
                    >
                      {project.project_name}
                    </li>
                  ))
                ) : (
                  <li className="p-2 text-gray-400">No project found</li>
                )}
              </ul>
            </div>
          )}
        </div>
      </header>

      <div>
        {loading && <p className="p-4">Loading data...</p>}
        {error && <p className="p-4 text-red-500">Error: {error.message || "An unknown error occurred"}</p>}

        {workingHours && (
          <div className="p-4">
            <h3 className="text-lg font-semibold">{workingHours.project_name}</h3>
            <p><strong>Client ID:</strong> {workingHours.client_id}</p>
            <p><strong>Total Hours:</strong> {workingHours.project_total_hours}</p>
            <p><strong>Deadline:</strong> {workingHours.deadline}</p>
            <p><strong>Requirements:</strong> {workingHours.requirements}</p>
          </div>
        )}

        {filteredChartData ? (
          <DoughnutChart data={filteredChartData} width={389} height={260} />
        ) : (
          <p className="font-bold text-red-500 text-center p-4">No data available for the selected project</p>
        )}
      </div>
    </div>
  );
}

export default DashboardCard01;
