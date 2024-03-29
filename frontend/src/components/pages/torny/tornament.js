import React, { useState, useEffect } from 'react';
import { Container, Dropdown, Button, Row, Col, Form } from 'react-bootstrap';

const TournamentPractice = () => {
  const [scores, setScores] = useState([]);
  const [machines, setMachines] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy');
  const [averageScore, setAverageScore] = useState(null);
  const [adjustedScores, setAdjustedScores] = useState({
    subtracted: null,
    normal: null,
    added: null,
  });
  const [yourScore, setYourScore] = useState('');
  const [showScores, setShowScores] = useState(false);

  const fetchScores = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER_URI}/score/getAll`);
      const data = await response.json();
      setScores(data);
      // Extract unique machine names
      const uniqueMachines = Array.from(new Set(data.map((score) => score.machine)));
      setMachines(uniqueMachines);
    } catch (error) {
      console.error('Error fetching scores:', error);
    }
  };

  useEffect(() => {
    fetchScores();
  }, []);

  const handleMachineChange = (machine) => {
    setSelectedMachine(machine);
  };

  const handleDifficultyChange = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  const getRandomPercentage = (min, max) => {
    return (Math.random() * (max - min) + min) / 100;
  };

  const startTournamentPractice = () => {
    if (selectedMachine) {
      const machineScores = scores.filter((score) => score.machine === selectedMachine);
      if (machineScores.length === 0) {
        setAverageScore(null);
        setAdjustedScores({
          subtracted: null,
          normal: null,
          added: null,
        });
      } else {
        const totalScore = machineScores.reduce((acc, score) => acc + score.score, 0);
        const average = totalScore / machineScores.length;

        let difficultyModifier;
        switch (selectedDifficulty) {
          case 'easy':
            difficultyModifier = [getRandomPercentage(-25, 10), getRandomPercentage(-25, 10)];
            break;
          case 'normal':
            difficultyModifier = [getRandomPercentage(-25, 25), getRandomPercentage(-25, 25)];
            break;
          case 'hard':
            difficultyModifier = [getRandomPercentage(10, 50), getRandomPercentage(10, 50)];
            break;
          default:
            difficultyModifier = [0, 0];
        }

        setAverageScore(average);
        setAdjustedScores({
          subtracted: average + average * difficultyModifier[1],
          normal: average,
          added: average + average * difficultyModifier[0],
        });

        // Show scores and hide dropdowns and button
        setShowScores(true);
      }
    }
  };

  const goBack = () => {
    // Hide scores and show dropdowns and button
    setShowScores(false);
    // Reset your score input
    setYourScore('');
  };

  return (
    <Container className="d-flex  justify-content-center" style={{ height: '100vh' }}>
      <div>
        <h1>Tournament Practice</h1>
        <p>Find the scores you should be aiming for.</p>

        {!showScores ? (
          <>
            <Row className="mb-3">
              <Col>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-machine">
                    {selectedMachine ? `Machine: ${selectedMachine}` : 'Select Machine'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {machines.map((machine, index) => (
                      <Dropdown.Item key={index} onClick={() => handleMachineChange(machine)}>
                        {machine}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col>
                <Dropdown>
                  <Dropdown.Toggle variant="info" id="dropdown-difficulty">
                    {`Difficulty: ${selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1)}`}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleDifficultyChange('easy')}>Easy</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDifficultyChange('normal')}>Normal</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDifficultyChange('hard')}>Hard</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col>
                <Button variant="primary" onClick={startTournamentPractice}>
                  Start
                </Button>
              </Col>
            </Row>
          </>
        ) : (
          <div className="mt-3">
            <h3>Tournament Practice for {selectedMachine}</h3>
            <p>Remember to <a href="/score">Submit</a> your score!</p>
            <Row>
              <Col>
                <p>Player 1:</p>
                <p>{Math.round(adjustedScores.subtracted)}</p>
              </Col>
              <Col>
                <p>Player 2:</p>
                <p>{Math.round(adjustedScores.normal)}</p>
              </Col>
              <Col>
                <p>Player 3:</p>
                <p>{Math.round(adjustedScores.added)}</p>
              </Col>
              <Col>
                
                
              </Col>
            </Row>

            <Button variant="primary" onClick={goBack} className="mt-3">
              Go Back
            </Button>
          </div>
        )}
      </div>
    </Container>
  );
};

export default TournamentPractice;
