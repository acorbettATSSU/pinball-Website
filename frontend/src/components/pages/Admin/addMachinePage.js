// src/MachineForm.js
import React, { useState } from "react";
import axios from "axios";

const MachineForm = () => {
  const [formData, setFormData] = useState({
    machine: "",
    year: "",
    maker: "",
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
      await axios.post(`${process.env.REACT_APP_BACKEND_SERVER_URI}/machine/addMachine`, formData);
      alert("Machine data sent successfully!");
      // You can reset the form here if needed.
      setFormData({
        machine: "",
        year: "",
        maker: "",
      });
    } catch (error) {
      console.error("Error sending data:", error);
    }  
  };

  return (
    <div className="card mx-auto" style={{ maxWidth: "400px" }}>
      <div className="card-body">
        <h5 className="card-title">Add Machine</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="machine" className="form-label">
              Machine Name.
            </label>
            <input
              type="text"
              className="form-control"
              id="machine"
              name="machine"
              value={formData.machine}
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
            <label htmlFor="maker" className="form-label">
              Maker
            </label>
            <input
              type="text"
              className="form-control"
              id="maker"
              name="maker"
              value={formData.maker}
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
