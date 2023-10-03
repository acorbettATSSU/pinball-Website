import React, { useState, useEffect } from 'react';

const ScorePage = () => {
  const [scores, setScores] = useState([]);
  const [filteredMachine, setFilteredMachine] = useState('');
  const [filteredName, setFilteredName] = useState('');

  useEffect(() => {
    // Fetch data from the API
    fetch('http://localhost:8081/score/getAll')
      .then((response) => response.json())
      .then((data) => {
        // Sort the data by score in descending order
        const sortedData = data.sort((a, b) => b.score - a.score);
        setScores(sortedData);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const uniqueMachines = [...new Set(scores.map((score) => score.machine))];
  const uniqueNames = [...new Set(scores.map((score) => score.name))];

  const handleMachineFilterChange = (event) => {
    setFilteredMachine(event.target.value);
  };

  const handleNameFilterChange = (event) => {
    setFilteredName(event.target.value);
  };

  const filteredScores = scores.filter(
    (score) =>
      (!filteredMachine || score.machine === filteredMachine) &&
      (!filteredName || score.name === filteredName)
  );

  return (
    <div className="container mt-4">
      <h1 className="mb-3">Scores</h1>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="machineFilter">Filter by Machine:</label>
            <select
              id="machineFilter"
              className="form-control"
              onChange={handleMachineFilterChange}
              value={filteredMachine}
            >
              <option value="">All Machines</option>
              {uniqueMachines.map((machine) => (
                <option key={machine} value={machine}>
                  {machine}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="nameFilter">Filter by Name:</label>
            <select
              id="nameFilter"
              className="form-control"
              onChange={handleNameFilterChange}
              value={filteredName}
            >
              <option value="">All Names</option>
              {uniqueNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Machine</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {filteredScores.map((score, index) => (
                <tr key={index}>
                  <td>{score.name}</td>
                  <td>{score.machine}</td>
                  <td>{score.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ScorePage;
