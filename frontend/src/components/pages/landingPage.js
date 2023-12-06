import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Col, Row, Carousel } from 'react-bootstrap';

import image1 from '../photos/image1.jpg';
import image2 from '../photos/image2.jpg';
import image3 from '../photos/image3.jpg';
import image4 from '../photos/image4.jpg';
//this is messy, and will be BAD with a lot of images, but w/e

function App() {
  return (
    <Container className="mt-5 text-center">
      <h1>Welcome to PinScores</h1>

      <Row className="mt-5">
        <Col xs={12} md={6}>
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={image1}
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={image2}
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={image3}
                alt="Third slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={image4}
                alt="Fourth slide"
              />
            </Carousel.Item>
          </Carousel>
        </Col>

        <Col xs={12} md={6}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Text>
              Welcome to PinScores! Explore the exciting world of pinball machines and enjoy the thrilling experience of playing your favorite games. Whether you're a seasoned player or new to pinball, our app offers a unique and immersive journey into the world of silver balls, flippers, and bumpers.

Discover a wide range of pinball machines, each with its own theme and challenges. Immerse yourself in the captivating gameplay, test your skills, and compete with friends for the highest scores. Join our community of pinball enthusiasts and share your passion for this classic arcade game.

Get ready for an unforgettable pinball adventure. Start flipping those flippers and aim for high scores! Thank you for choosing PinScores.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
