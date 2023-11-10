import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [machines, setMachines] = useState([]);
  const [scores, setScores] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [averageScore, setAverageScore] = useState(null);
  const [machineScores, setMachineScores] = useState([]);

  useEffect(() => {
    // Fetch Machines
    axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URI}/machine/getAll`)
      .then(response => setMachines(response.data))
      .catch(error => console.error('Error fetching machines:', error));

    // Fetch Scores
    axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URI}/score/getAll`)
      .then(response => setScores(response.data))
      .catch(error => console.error('Error fetching scores:', error));
  }, []);

  // ...

const handleCalculateAverage = () => {
  // Ensure a machine is selected
  if (!selectedMachine) {
    return;
  }

  // Extract machine identifier from selectedMachine
  const machineIdentifier = selectedMachine.machine;

  // Send request to get scores for the selected machine
  axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URI}/score/getScoreMacID/${encodeURIComponent(machineIdentifier)}`)
    .then(response => {
      console.log('Scores for selected machine:', response.data);
      setMachineScores(response.data);
    })
    .catch(error => console.error('Error fetching machine scores:', error));

  // Filter scores for the selected machine
  const selectedMachineScores = scores.filter(score => score.machine === selectedMachine.machine);

  // Check if there are scores for the selected machine
  if (selectedMachineScores.length === 0) {
    setAverageScore(0); // or any other default value
    return;
  }

  // Calculate the average score
  const totalScore = selectedMachineScores.reduce((sum, score) => sum + score.score, 0);
  const average = totalScore / selectedMachineScores.length;

  setAverageScore(average);
};

// ...


  return (
    <div className="container mt-5">
      <h1>Machine Scores</h1>

      <div className="form-group">
        <label>Select Machine:</label>
        <select
          className="form-control"
          value={selectedMachine ? selectedMachine.machine : ''}
          onChange={(e) => {
            const selected = machines.find(machine => machine.machine === e.target.value);
            setSelectedMachine(selected);
          }}
        >
          <option value="">Select a Machine</option>
          {machines.map(machine => (
            <option key={machine.id} value={`${machine.machine} (${machine.maker}, ${machine.year})`}>
              {`${machine.machine} (${machine.maker}, ${machine.year})`}
            </option>
          ))}
        </select>
      </div>

      <button
        className="btn btn-primary"
        onClick={handleCalculateAverage}
        disabled={!selectedMachine}
      >
        Calculate Average Score
      </button>

      {averageScore !== null && (
        <div className="mt-3">
          <p>
            Average Score for {`${selectedMachine.machine}`} is: {averageScore.toFixed(2)}
          </p>
        </div>
      )}

      {machineScores.length > 0 && (
        <div className="mt-3">
          <h3>Scores for {`${selectedMachine.machine}`}</h3>
          <ul>
            {machineScores.map(score => (
              <li key={score.id}>{`${score.name}: ${score.score}`}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
