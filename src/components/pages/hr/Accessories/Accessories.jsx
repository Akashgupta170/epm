import React, { useState } from 'react';
import { Eye, EyeOff, Search  ,BarChart} from 'lucide-react';
import {SectionHeader } from "../../../components/SectionHeader";
const initialData = [
  {
    id: 1,
    name: 'John Doe',
    setup: 'laptop',
    condition: 'Good',
    note: 'New employee',
    issueDate: '2025-04-01',
    accessories: {
      Laptop: { model: 'Dell XPS 13', condition: 'Good', issueDate: '2025-04-01', note: 'Primary device' },
      Mouse: { model: 'Logitech M235', condition: 'Good', issueDate: '2025-04-02', note: '' },
      Keyboard: { model: 'Logitech K120', condition: 'Good', issueDate: '2025-04-02', note: '' },
    },
  },
  {
    id: 2,
    name: 'Jane Smith',
    setup: 'pc',
    condition: 'Used',
    note: 'Transferred from IT dept',
    issueDate: '2025-03-15',
    accessories: {
      PC: { model: 'HP EliteDesk', condition: 'Used', issueDate: '2025-03-15', note: '' },
      Monitor: { model: 'Samsung 24"', condition: 'Good', issueDate: '2025-03-16', note: '' },
      Mouse: { model: 'Dell Mouse', condition: 'Good', issueDate: '2025-03-16', note: '' },
      Keyboard: { model: 'Dell KB216', condition: 'Good', issueDate: '2025-03-16', note: '' },
    },
  },
];
export default function EmployeeAccessoriesTable() {
  const [employees, setEmployees] = useState(initialData);
  const [expandedUserId, setExpandedUserId] = useState(null);
  const [filters, setFilters] = useState({ name: '', setup: '', date: '' });
  const toggleView = (id) => {
    setExpandedUserId(prev => (prev === id ? null : id));
  };
  const handleFieldChange = (empId, accessoryName, field, value) => {
    const updated = employees.map(emp => {
      if (emp.id === empId) {
        const updatedAccessories = {
          ...emp.accessories,
          [accessoryName]: {
            ...emp.accessories[accessoryName],
            [field]: value,
          },
        };
        return { ...emp, accessories: updatedAccessories };
      }
      return emp;
    });
    setEmployees(updated);
  };
  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value.toLowerCase() }));
  };
  const filteredEmployees = employees.filter(emp => {
    return (
      emp.name.toLowerCase().includes(filters.name) &&
      emp.setup.toLowerCase().includes(filters.setup) &&
      emp.issueDate.includes(filters.date)
    );
  });
  return (
    <div className="max-full mx-auto  bg-white shadow rounded-lg">
      {/* <h2 className="text-3xl font-semibold mb-6 text-gray-800">Employee Accessories Management</h2> */}
      <SectionHeader icon={BarChart} title="Employee Accessories Management" subtitle="View, edit and manage accessories" />
      <div className="flex flex-wrap md:flex-nowrap items-center gap-3 border p-2 rounded-lg shadow-md bg-white">
      <div className="flex items-center w-full border border-gray-300 px-2 rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
      <Search className="h-5 w-5 text-gray-400 mr-[5px]" />
      <input
          type="text"
          placeholder="Search by Name"
          className="w-full rounded-lg focus:outline-none py-2"
          onChange={e => handleFilterChange('name', e.target.value)}
        />
        </div>
        
        <div className="flex items-center w-full border border-gray-300 px-2 rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
        <Search className="h-5 w-5 text-gray-400 mr-[5px]" />
        <input
          type="text"
          placeholder="Search by Setup (laptop/pc)"
          className="w-full rounded-lg focus:outline-none py-2"
          onChange={e => handleFilterChange('setup', e.target.value)}
        />
        </div>
        <input
          type="date"
          className="border border-gray-300 p-2 rounded-md shadow-sm"
          onChange={e => handleFilterChange('date', e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300 rounded-md shadow-md">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Setup</th>
              <th className="p-3 border">Issue Date</th>
              <th className="p-3 border">Condition</th>
              <th className="p-3 border">Note</th>
              <th className="p-3 border text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {filteredEmployees.map((emp) => (
              <React.Fragment key={emp.id}>
                <tr className="hover:bg-gray-100">
                  <td className="p-3 border font-medium">{emp.name}</td>
                  <td className="p-3 border">{emp.setup === 'laptop' ? 'Laptop' : 'PC + Monitor'}</td>
                  <td className="p-3 border">{emp.issueDate}</td>
                  <td className="p-3 border">{emp.condition}</td>
                  <td className="p-3 border">{emp.note}</td>
                  <td className="p-3 border text-center">
                    <button onClick={() => toggleView(emp.id)} className="text-blue-600 hover:text-blue-800">
                      {expandedUserId === emp.id ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </td>
                </tr>
                {expandedUserId === emp.id && (
                  <tr>
                    <td colSpan="6" className="p-2 border bg-gray-50">
                      <table className="w-full text-sm border">
                        <thead className="bg-gray-200">
                          <tr>
                            <th className="p-2 border">Accessory</th>
                            <th className="p-2 border">Model</th>
                            <th className="p-2 border">Condition</th>
                            <th className="p-2 border">Issue Date</th>
                            <th className="p-2 border">Note</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.keys(emp.accessories).map((accessory, idx) => (
                            <tr key={idx} className="hover:bg-white">
                              <td className="p-2 border font-medium">{accessory}</td>
                              <td className="p-2 border">
                                <input
                                  type="text"
                                  className="border px-2 py-1 w-full rounded"
                                  value={emp.accessories[accessory].model}
                                  onChange={e => handleFieldChange(emp.id, accessory, 'model', e.target.value)}
                                />
                              </td>
                              <td className="p-2 border">
                                <input
                                  type="text"
                                  className="border px-2 py-1 w-full rounded"
                                  value={emp.accessories[accessory].condition}
                                  onChange={e => handleFieldChange(emp.id, accessory, 'condition', e.target.value)}
                                />
                              </td>
                              <td className="p-2 border">
                                <input
                                  type="date"
                                  className="border px-2 py-1 w-full rounded"
                                  value={emp.accessories[accessory].issueDate}
                                  onChange={e => handleFieldChange(emp.id, accessory, 'issueDate', e.target.value)}
                                />
                              </td>
                              <td className="p-2 border">
                                <input
                                  type="text"
                                  className="border px-2 py-1 w-full rounded"
                                  value={emp.accessories[accessory].note}
                                  onChange={e => handleFieldChange(emp.id, accessory, 'note', e.target.value)}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}