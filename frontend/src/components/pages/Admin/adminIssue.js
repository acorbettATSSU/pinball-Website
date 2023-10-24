import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';

const statusOptions = ['Open', 'In Progress', 'Closed'];

function ScoreCards() {
  const [data, setData] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [updatedStatuses, setUpdatedStatuses] = useState({});

  useEffect(() => {
    fetch('http://localhost:8081/issue/getAll')
      .then((response) => response.json())
      .then((data) => {
        const initialStatuses = {};
        data.forEach((item) => {
          initialStatuses[item.id] = item.status;
        });
        setUpdatedStatuses(initialStatuses);
        setData(data);
      })
      .catch((error) => console.error('Error fetching data: ', error));
  }, []);

  const machineOptions = ['All', ...new Set(data.map((item) => item.machine))];

  const handleMachineSelect = (machine) => {
    setSelectedMachine(machine);
  };

  const handleStatusSelect = (status, issueId) => {
    setUpdatedStatuses({
      ...updatedStatuses,
      [issueId]: status,
    });
  };

  const handleUpdateStatus = (issueId) => {
    const updatedData = data.map((item) =>
      item.id === issueId
        ? { ...item, status: updatedStatuses[issueId] }
        : item
    );
    setData(updatedData);
  };

  const filteredData = data.filter(
    (item) =>
      (selectedMachine === 'All' || item.machine === selectedMachine) &&
      (selectedStatus === 'All' || item.status === selectedStatus)
  );

  return (
    <div className="container mt-4">
      <div className="row mb-3">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="machineFilter">Filter by Machine:</label>
            <select
              id="machineFilter"
              className="form-control"
              onChange={(e) => handleMachineSelect(e.target.value)}
              value={selectedMachine}
            >
              {machineOptions.map((machine, index) => (
                <option key={index} value={machine}>
                  {machine}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="statusFilter">Filter by Status:</label>
            <select
              id="statusFilter"
              className="form-control"
              onChange={(e) => setSelectedStatus(e.target.value)}
              value={selectedStatus}
            >
              {statusOptions.map((status, index) => (
                <option key={index} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="row">
        {filteredData.map((item, index) => (
          <div key={index} className="col-md-4 mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{item.machine}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Submitter - {item.name}</Card.Subtitle>
                <Card.Text>{item.issue}</Card.Text>
                <div className="form-group">
                  <div>Status: {item.status}</div>
                  <label htmlFor={`statusDropdown_${item.id}`}>Change Status:</label>
                  <select
                    id={`statusDropdown_${item.id}`}
                    className="form-control"
                    value={updatedStatuses[item.id] || item.status}
                    onChange={(e) => handleStatusSelect(e.target.value, item.id)}
                  >
                    {statusOptions.map((status, index) => (
                      <option key={index} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleUpdateStatus(item.id)}
                    className="btn btn-primary"
                  >
                    Update
                  </button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScoreCards;
