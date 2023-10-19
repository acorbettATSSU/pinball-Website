import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import getUserInfo from "../../utilities/decodeJwt";

function ScoreForm() {
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    machine: '',
    name: '', // Remove the name field
    score: '',
  });
  useEffect(() => {
    setUser(getUserInfo());
  }, []);
  const [machineOptions, setMachineOptions] = useState([]);

  useEffect(() => {
    // Fetch machine data from the API and populate the dropdown options
    axios.get('http://localhost:8081/machine/getAll')
      .then(response => {
        const options = response.data.map(machine => ({
          value: machine.id,
          label: `${machine.machine} (${machine.maker}, ${machine.year})`,
        }));
        setMachineOptions(options);
      })
      .catch(error => {
        console.error('Error fetching machine data:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleMachineChange = (e) => {
    const selectedMachineId = e.target.value;
    setFormData({
      ...formData,
      machine: selectedMachineId,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8081/score/addScore', {
        ...formData,
        name: user.displayName, // Set the name to user.displayName
      });
      alert('Score added successfully!');
      setFormData({
        machine: '',
        name: '',
        score: '',
      });
    } catch (error) {
      console.error('Error adding score:', error);
    }
  };
  if (!user) return (<div><h4>Log in to view this page.</h4></div>)
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Submit Score</h5>
              <p>Submitting as {user.displayName}</p> {/* Add this line */}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="machine" className="form-label">Machine:</label>
                  <select
                    id="machine"
                    name="machine"
                    value={formData.machine}
                    onChange={handleMachineChange}
                    className="form-control"
                    required
                  >
                    <option value="" disabled>Select a machine</option>
                    {machineOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Remove the name input field */}
                <div className="mb-3">
                  <label htmlFor="score" className="form-label">Score:</label>
                  <input
                    type="number"
                    id="score"
                    name="score"
                    value={formData.score}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScoreForm;
