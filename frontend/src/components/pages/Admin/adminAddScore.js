import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import getUserInfo from "../../../utilities/decodeJwt";

function ScoreForm() {
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    machine: '',
    name: '', // Keep the name field for user input
    score: '',
  });

  useEffect(() => {
    setUser(getUserInfo());
  }, []);

  const [machineOptions, setMachineOptions] = useState([]);

  useEffect(() => {
    // Fetch machine data from the API and populate the dropdown options
    axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URI}/machine/getAll`)
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
      await axios.post(`${process.env.REACT_APP_BACKEND_SERVER_URI}/score/addScore`, {
        ...formData,
        // Set the name to the entered value by the user
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

  if(!user){
    return(
      <h4>you must log in</h4>
    )
  }
  
  
    if (user.displayName != 'adminn') {
      return (
        <h4>You must be an admin to view this page</h4>
      );
    }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Admin add Score Page</h5>
              <p>Use when bulk adding scores</p> 
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
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Your Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
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
