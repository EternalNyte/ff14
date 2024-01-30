import React, { useEffect, useState } from 'react';
import './App.css';
import { Container, Row, Col, Table } from 'react-bootstrap';

import api from './api';
import { AbilityData, CSVData, JobData } from './types/dataTypes';
import CSVDownloadButton from './components/CSVDownloadButton';
import CopyCSVToClipboardButton from './components/CopyCSVToClipboardButton';
import JobToggleButtonList from './components/JobToggleButtonList';

const App: React.FC = () => {
  const [jobs, setJobs] = useState<JobData[]>([]);
  const maxRetries = 3;

  // Mount jobs from api
  useEffect(() => {
    let retryCount = 0;
    const fetchJobs = async () => {
      try {
        const response = await api.get('/api/jobs');

        const jobArray: JobData[] = [];
        response.data.forEach((job: JobData) => {
          jobArray[ job.id ] = job;
        });

        setJobs( jobArray );
      } catch (error) {
        console.error('Error fetching jobs:', error);

        // 3 tries total
        if (retryCount < maxRetries) {
          retryCount++;
          setTimeout(fetchJobs, 2000); // Retry after a 2-second delay
        }
      }
    };

    fetchJobs();
  }, [] );

  const [selectedJobIds, setSelectedJobIds] = useState<number[]>([]);
  // Pressing a Job Button toggles it in the selected jobs list
  const handleToggle = async (jobId: number): Promise<void> =>{
    const updatedJobIds = selectedJobIds.includes(jobId)
      ? selectedJobIds.filter((id) => id !== jobId)
      : [...selectedJobIds, jobId];

    setSelectedJobIds(updatedJobIds);
  };

  const [abilities, setAbilities] = useState<AbilityData[]>([]);
  const [csvData, setCSVData] = useState<CSVData>([]);

  // Update ability table and csv data when jobs are selected/unselected
  useEffect(() => {
    const updateCSVData = (abilities: any[]) => {
      const headerData: CSVData = [["Name", "Job", "Recast", "Duration", "Type", "Amount", "Target"]];
      const data = abilities.map((ability) => [ ability.name, jobs[ ability.job_id ].name,
                                                ability.recast,
                                                ability.duration, ability.type,
                                                ability.amount, ability.target ]);
      setCSVData(headerData.concat(data));
    };

    const fetchJobAbilities = async () => {
      try {
        if ( selectedJobIds.length === 0 ) {
          updateCSVData([]);
          setAbilities([]);
          return;
        }
        const jobIdStr = selectedJobIds.join(',');
        const response = await api.get(`/api/abilities?job_ids=${jobIdStr}`);
        updateCSVData(response.data);
        setAbilities(response.data);
      } catch (error) {
        console.error('Error fetching abilities:', error);
      }
    };

    fetchJobAbilities();
  }, [jobs, selectedJobIds]);

  return (
    <Container>
      <div className="mt-3">
        <JobToggleButtonList items={jobs} selectedIds={selectedJobIds} onToggle={handleToggle} />
      </div>
      <Row>
        <Col>
          <h1>Ability List <CSVDownloadButton data={csvData}/> <CopyCSVToClipboardButton data={csvData}/></h1>
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
                  <td>{jobs[ability.job_id].name}</td>
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

