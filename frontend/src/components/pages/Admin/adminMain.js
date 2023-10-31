import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import the Link component
import getUserInfo from "../../../utilities/decodeJwt";

const AdminMain = () => {
  // Check if the user is an admin (implement your logic here)
  const isAdmin = true; // Replace with your admin check logic
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(getUserInfo());
  }, []);

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
    <div className="card-grid">
      <p>Test</p>
      <Link to="/admin/score">Go to Admin Score Page</Link>
      <p></p>
      <Link to="/admin/issue">Go to Admin Issue Page</Link>     
      <p></p>
      <Link to="/AMtest">Go to Machine Mage Page</Link>
    </div>
  );
};

export default AdminMain;
