// src/MachineForm.js
import React, { useState } from "react";
import axios from "axios";

const MachineForm = () => {
  const [formData, setFormData] = useState({
    machineName: "",
    year: "",
    creator: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      await axios.post("http://localhost:8081/machine/addMachine", formData);
      alert("Machine data sent successfully!");
      // You can reset the form here if needed.
      setFormData({
        machineName: "",
        year: "",
        creator: "",
      });
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Add Machine</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="machineName" className="form-label">
              Machine Name
            </label>
            <input
              type="text"
              className="form-control"
              id="machineName"
              name="machineName"
              value={formData.machineName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="year" className="form-label">
              Year
            </label>
            <input
              type="number"
              className="form-control"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="creator" className="form-label">
              Creator
            </label>
            <input
              type="text"
              className="form-control"
              id="creator"
              name="creator"
              value={formData.creator}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default MachineForm;
