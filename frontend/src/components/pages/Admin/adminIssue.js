// IssueList.js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import IssueCard from './IssueCard';

const IssueList = () => {
  const [issues, setIssues] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [machines, setMachines] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  useEffect(() => {
    // Fetch issues from the API
    fetch(`${process.env.REACT_APP_BACKEND_SERVER_URI}/issue/getAll`)
      .then((response) => response.json())
      .then((data) => {
        setIssues(data);
        setFilteredIssues(data);

        // Extract unique machine names and statuses for dropdowns
        const uniqueMachines = Array.from(new Set(data.map(issue => issue.machine)));
        const uniqueStatuses = Array.from(new Set(data.map(issue => issue.status)));

        setMachines(['All', ...uniqueMachines]);
        setStatuses(['All', ...uniqueStatuses]);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    // Filter issues based on selected machine and status
    let filtered = issues;
    if (selectedMachine !== 'All') {
      filtered = filtered.filter(issue => issue.machine === selectedMachine);
    }
    if (selectedStatus !== 'All') {
      filtered = filtered.filter(issue => issue.status === selectedStatus);
    }
    setFilteredIssues(filtered);
  }, [selectedMachine, selectedStatus, issues]);

  const handleUpdateStatus = () => {
    // Refetch all issues after updating status
    fetch(`${process.env.REACT_APP_BACKEND_SERVER_URI}/issue/getAll`)
      .then((response) => response.json())
      .then((data) => {
        setIssues(data);
        setFilteredIssues(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <label htmlFor="machineFilter" className="form-label">Filter by Machine:</label>
          <select
            id="machineFilter"
            className="form-select"
            onChange={(e) => setSelectedMachine(e.target.value)}
            value={selectedMachine}
          >
            {machines.map((machine) => (
              <option key={machine} value={machine}>
                {machine}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <label htmlFor="statusFilter" className="form-label">Filter by Status:</label>
          <select
            id="statusFilter"
            className="form-select"
            onChange={(e) => setSelectedStatus(e.target.value)}
            value={selectedStatus}
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row mt-4">
        {filteredIssues.map((issue) => (
          <IssueCard key={issue.id} issue={issue} onUpdateStatus={handleUpdateStatus} />
        ))}
      </div>
    </div>
  );
};

export default IssueList;
