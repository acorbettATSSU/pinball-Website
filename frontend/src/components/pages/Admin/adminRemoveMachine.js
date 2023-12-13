import React, { useState, useEffect } from 'react';
import getUserInfo from "../../../utilities/decodeJwt";

const AdminRemoveMachine = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(getUserInfo());
  }, []);

  if (user.displayName !== 'admin') {
    return (
      <h4>You must be an admin to view this page</h4>
    );
  }

  return (
    <p>ww</p>
  );
};

export default AdminRemoveMachine;
