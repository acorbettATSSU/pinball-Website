import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Col, Row } from 'react-bootstrap';

function App() {
  return (
    <Container className="mt-5 text-center">
      <h1>Welcome to the Pinball Web App</h1>

      <Row className="mt-5">
        <Col xs={12} md={6}>
          <Card className="mb-3">
            <Card.Img
              variant="top"
              src="https://scontent-bos5-1.xx.fbcdn.net/v/t39.30808-6/269782738_4923260361047100_6872451153850877821_n.jpg?stp=dst-jpg_p720x720&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=p1bODfetPkQAX9pYzY1&_nc_ht=scontent-bos5-1.xx&oh=00_AfBR9ZI13PdILT7H64kO-pv6CUp7QAbUI00JPoVbdqsYPg&oe=655C6F0A"
              alt="Pinball"
              style={{ width: '100%', height: 'auto' }}
            />
          </Card>
        </Col>

        <Col xs={12} md={6}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
