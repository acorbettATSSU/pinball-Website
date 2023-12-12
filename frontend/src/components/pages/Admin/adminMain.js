import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import getUserInfo from "../../../utilities/decodeJwt";

const AdminMain = () => {
  const isAdmin = true; // Replace with your admin check logic
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(getUserInfo());
  }, []);

  if (!user) {
    return (
      <h4>You must log in</h4>
    );
  }

  if (user.displayName !== 'adminn') {
    return (
      <h4>You must be an admin to view this page</h4>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Score Page</h5>
              <Link to="/admin/score" className="btn btn-primary">Go to Admin Score Page</Link>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Issue Page</h5>
              <Link to="/admin/issue" className="btn btn-primary">Go to Admin Issue Page</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Add Machine</h5>
              <Link to="/AMtest" className="btn btn-primary">Go to Add Machine Page</Link>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Admin Add Score</h5>
              <Link to="/admin/addScore" className="btn btn-primary">Go to Admin Add Score Page</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMain;
