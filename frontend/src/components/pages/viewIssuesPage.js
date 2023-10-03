import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';

function ScoreCards() {
  const [data, setData] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  useEffect(() => {
    fetch('http://localhost:8081/issue/getAll')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data: ', error));
  }, []);

  const filteredData = data.filter(
    (item) =>
      (selectedMachine === 'All' || item.machine === selectedMachine) &&
      (selectedStatus === 'All' || item.status === selectedStatus)
  );

  const machineOptions = ['All', ...new Set(data.map((item) => item.machine))];
  const statusOptions = ['All', ...new Set(data.map((item) => item.status))];

  const handleMachineSelect = (machine) => {
    setSelectedMachine(machine);
  };

  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
  };

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
              onChange={(e) => handleStatusSelect(e.target.value)}
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
                <Card.Subtitle className="mb-2 text-muted">{item.name}</Card.Subtitle>
                <Card.Text>{item.issue}</Card.Text>
                <Card.Text>Status: {item.status}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScoreCards;
