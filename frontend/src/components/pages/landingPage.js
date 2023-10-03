import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card } from 'react-bootstrap';

function App() {
  return (
    <Container className="mt-5 text-center">
      <h1>Welcome to the Pinball Web App</h1>
      <Card style={{ width: '18rem', margin: 'auto' }}>
        <Card.Img
          variant="top"
          src="https://scontent-bos5-1.xx.fbcdn.net/v/t39.30808-6/294646156_469495161843617_8910844761777261837_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=a2f6c7&_nc_oh=UaZsAussAZ4AX8uGRqs&_nc_ht=scontent-bos5-1.xx&oh=00_AfC0DVOBUWwzEcxkJL3G6HC-btDAV1g9jmjvV6aU96Ucs3w&oe=650CF193"
          alt="Pinball"
        />
      </Card>
    </Container>
  );
}

export default App;
