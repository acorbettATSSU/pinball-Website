import React, { useState, useEffect } from 'react';
import getUserInfo from "../../../utilities/decodeJwt";

const ScorePage = () => {
  const [scores, setScores] = useState([]);
  const [filteredMachine, setFilteredMachine] = useState('');
  const [filteredName, setFilteredName] = useState('');

  useEffect(() => {
    // Function to fetch scores
    const fetchScores = () => {
      fetch(`${process.env.REACT_APP_BACKEND_SERVER_URI}/score/getAll`)
        .then((response) => response.json())
        .then((data) => {
          // Sort the data by score in descending order
          const sortedData = data.sort((a, b) => b.score - a.score);
          setScores(sortedData);
        })
        .catch((error) => console.error('Error fetching data:', error));
    };

    // Call the fetchScores function on component mount
    fetchScores();
  }, []);

  const uniqueMachines = [...new Set(scores.map((score) => score.machine))];
  const uniqueNames = [...new Set(scores.map((score) => score.name))];
  

  const handleMachineFilterChange = (event) => {
    setFilteredMachine(event.target.value);
  };

  const handleNameFilterChange = (event) => {
    setFilteredName(event.target.value);
  };

  const handleRemoveScore = (scoreId) => {
    fetch(`${process.env.REACT_APP_BACKEND_SERVER_URI}/score/removeScore/${scoreId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.status === 200) {
          // Score entry deleted successfully
          // Update the scores state by removing the deleted score
          setScores((prevScores) => prevScores.filter((score) => score._id !== scoreId));
        } else if (response.status === 404) {
          // No matching score found
        }
      })
      .catch((error) => console.error('Error removing score:', error));
  };

  const filteredScores = scores.filter(
    (score) =>
      (!filteredMachine || score.machine === filteredMachine) &&
      (!filteredName || score.name === filteredName)
  );

  const isAdmin = true; // Replace with your admin check logic
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(getUserInfo());
  }, []);

  if (user.displayName !== 'adminn') {
    return (
      <h4>You must be an admin to view this page</h4>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-3">ADMIN Scores</h1>
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredScores.map((score) => (
                <tr key={score._id}>
                  <td>{score.name}</td>
                  <td>{score.machine}</td>
                  <td>{score.score}</td>
                  <td>
                    <button onClick={() => handleRemoveScore(score._id)}>Remove</button>
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

export default ScorePage;
