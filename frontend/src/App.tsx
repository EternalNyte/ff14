import React, { useEffect, useState } from 'react';
import api from './api';
import { Container, Row, Col, Table } from 'react-bootstrap';

const App: React.FC = () => {
  const [abilities, setAbilities] = useState<any[]>([]);

  useEffect(() => {
    const fetchAbilities = async () => {
      try {
        const response = await api.get('/api/abilities');
        setAbilities(response.data);
      } catch (error) {
        console.error('Error fetching abilities:', error);
      }
    };

    fetchAbilities();
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <h1>Ability List</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Job</th>
                <th>Recast</th>
                <th>Duration</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Target</th>
              </tr>
            </thead>
            <tbody>
              {abilities.map((ability) => (
                <tr key={ability.id}>
                  <td>{ability.id}</td>
                  <td>{ability.name}</td>
                  <td>{ability.job}</td>
                  <td>{ability.recast}</td>
                  <td>{ability.duration}</td>
                  <td>{ability.type}</td>
                  <td>{ability.amount}</td>
                  <td>{ability.target}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default App;

