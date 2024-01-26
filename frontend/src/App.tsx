import React, { useEffect, useState } from 'react';
import api from './api';
import { Container, Row, Col, Table } from 'react-bootstrap';
import ToggleButtonList from './components/ToggleButtonList';
import './App.css';

const App: React.FC = () => {
  const [abilities, setAbilities] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [selectedJobIds, setSelectedJobIds] = useState<number[]>([]);

  const handleToggle = async (jobId: number) => {
    const updatedJobIds = selectedJobIds.includes(jobId)
      ? selectedJobIds.filter((id) => id !== jobId)
      : [...selectedJobIds, jobId];

    setSelectedJobIds(updatedJobIds);
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get('/api/jobs');
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    const fetchJobAbilities = async () => {
      try {
        if ( selectedJobIds.length === 0 ) {
          return;
        }
        const jobIdStr = selectedJobIds.join(',');
        const response = await api.get(`/api/abilities?job_ids=${jobIdStr}`);
        setAbilities(response.data);
      } catch (error) {
        console.error('Error fetching abilities:', error);
      }
    };

    fetchJobs();
    fetchJobAbilities();
  }, [selectedJobIds]);

  return (
    <Container>
      <div className="mt-3">
        <ToggleButtonList jobs={jobs} selectedJobIds={selectedJobIds} onToggle={handleToggle} />
      </div>
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
                  <td>{jobs[ability.job_id-1].name}</td>
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

