import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import the Link component
import getUserInfo from "../../../utilities/decodeJwt";

const adminMain = () => {
  
  // Check if the user is an admin (implement your logic here)
  const isAdmin = true; // Replace with your admin check logic

  if (!isAdmin) {
    return (
      <h4>You must be an admin to view this page</h4>
    );
  }

  return (
    <div className="card-grid">
      <p>Test</p>
      <Link to="/admin/score">Go to Admin Score Page</Link>
    </div>
  );
};

export default adminMain;
