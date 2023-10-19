import React, { useState, useEffect } from 'react';
import axios from 'axios';
import getUserInfo from "../../utilities/decodeJwt";

function IssueForm() {
  const [formData, setFormData] = useState({
    machine: '',
    name: '', // Remove the name field
    issue: '',
    status: 'open',
  });
  const [user, setUser] = useState({});
  const [machineOptions, setMachineOptions] = useState([]);
  useEffect(() => {
    setUser(getUserInfo());
  }, []);
  useEffect(() => {
    // Fetch data from the API and format it as "Machine (year, maker)"
    axios.get('http://localhost:8081/machine/getAll')
      .then((response) => {
        const formattedMachineOptions = response.data.map((machine) => {
          return `${machine.machine} (${machine.year}, ${machine.maker})`;
        });
        setMachineOptions(formattedMachineOptions);
      })
      .catch((error) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8081/issue/addIssue', {
        ...formData,
        name: user.displayName, // Set the name to user.displayName
      });
      alert('Issue added successfully!');
      setFormData({
        machine: '',
        name: '', // Remove the name field
        issue: '',
        status: 'open',
      });
    } catch (error) {
      console.error('Error adding issue:', error);
    }
  };
  if (!user) return (<div><h4>Log in to view this page.</h4></div>)
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Issue Form</h5>
              <p>Submitting as {user.displayName}</p> {/* Add this line */}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="machine" className="form-label">
                    Machine:
                  </label>
                  <select
                    id="machine"
                    name="machine"
                    value={formData.machine}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="" disabled>Select Machine</option>
                    {machineOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Remove the name input field */}
                <div className="mb-3">
                  <label htmlFor="issue" className="form-label">
                    Issue:
                  </label>
                  <input
                    type="text"
                    id="issue"
                    name="issue"
                    value={formData.issue}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="status" className="form-label">
                    Status:
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="open">Open</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IssueForm;
