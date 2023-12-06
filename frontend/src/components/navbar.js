import React, { useEffect, useState } from "react";
import getUserInfo from '../utilities/decodeJwt';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import ReactNavbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button'; // Import Button component
import { useNavigate } from 'react-router-dom';

// Here, we display our Navbar
export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  
  const handleClick = (e) => {
    e.preventDefault();
    localStorage.removeItem('accessToken');
    window.location.reload();
  };
  
  

  useEffect(() => {
    setUser(getUserInfo());
  }, []);

  //console.log(user);
//logged out
  if (!user) {
    return (
      <ReactNavbar bg="secondary" variant="dark">
        <Container>
          <Nav className="me-auto">
            
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/signup">Sign up</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/viewIssue">View Issues</Nav.Link>
            <Nav.Link href="/mScore">View Scores</Nav.Link>
            <Nav.Link href="/torn">Tornament Practice</Nav.Link>
            
          </Nav>
        </Container>
      </ReactNavbar>
    );
  }
//admin user
  if (user.displayName === 'adminn') {
    return (
      <ReactNavbar bg="danger" variant="dark">
        <Container>
          <Nav className="me-auto">
            
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/addIssue">Submit Issue</Nav.Link>
            <Nav.Link href="/viewIssue">View Issues</Nav.Link>
            <Nav.Link href="/score">Add Score</Nav.Link>
            <Nav.Link href="/mScore">View Scores</Nav.Link>
            <Nav.Link href="/torn">Tornament Practice</Nav.Link>
            <Nav.Link href="/admin/main">Admin Page</Nav.Link>
            <Button
              onClick={(e) => handleClick(e)}
              variant="dark"
              style={{ marginLeft: '10px' }} 
            >
              Log Out
            </Button>
          </Nav>
        </Container>
      </ReactNavbar>
    );
  }
  //logged in user
  return (
    <ReactNavbar bg="secondary" variant="dark">
    <Container>
      <Nav className="me-auto">
      
        <Nav.Link href="/">Home</Nav.Link>
        {/* <Nav.Link href="/home">Profile</Nav.Link> */}
     
        <Nav.Link href="/addIssue">Submit Issue</Nav.Link>
        
        <Nav.Link href="/viewIssue">View Issues</Nav.Link>
      
        <Nav.Link href="/score">Add Score</Nav.Link>
        
        <Nav.Link href="/mScore">View Scores</Nav.Link>
        <Nav.Link href="/torn">Tornament Practice</Nav.Link>
        <Button
              onClick={(e) => handleClick(e)}
              variant="secondary"
              style={{ marginLeft: '10px' }} 
            >
              Log Out
            </Button>
      </Nav>
    </Container>
  </ReactNavbar>

  );
}
