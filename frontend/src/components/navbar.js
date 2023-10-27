import React, { useEffect, useState } from "react";
import getUserInfo from '../utilities/decodeJwt';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import ReactNavbar from 'react-bootstrap/Navbar';


// Here, we display our Navbar
export default function Navbar() {
  // We are pulling in the user's info but not using it for now.
  // Warning disabled: 
  // eslint-disable-next-line
  const [user, setUser] = useState({})

  useEffect(() => {
  setUser(getUserInfo())
  }, [])
  
  // if (!user) return null   - for now, let's show the bar even not logged in.
  // we have an issue with getUserInfo() returning null after a few minutes
  // it seems.
  return (
    <ReactNavbar bg="dark" variant="dark">
    <Container>
      <Nav className="me-auto">
        <Nav.Link href="/">Home</Nav.Link>
        {/* <Nav.Link href="/home">Profile</Nav.Link> */}
        <Nav.Link href="/signup">Sign up</Nav.Link>
        <Nav.Link href="/login">Login</Nav.Link>
        
        <Nav.Link href="/addIssue">Submit Issue</Nav.Link>
        
        <Nav.Link href="/viewIssue">View Issues</Nav.Link>
      
        <Nav.Link href="/score">Add Score</Nav.Link>
        
        <Nav.Link href="/mScore">View Scores</Nav.Link>
      
      </Nav>
    </Container>
  </ReactNavbar>

  );
}