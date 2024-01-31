import axios from 'axios';
import { JobData } from '../types/dataTypes';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

const maxRetries = 3;
export const fetchJobs = async () => {
  let retryCount = 0;
  while (retryCount < maxRetries) {
    try {
      const response = await api.get('/api/jobs');

      const jobArray: JobData[] = [];
      response.data.forEach((job: JobData) => {
        jobArray[ job.id ] = job;
      });

      return jobArray;
    } catch (error) {
      console.error('Error fetching jobs:', error);

      retryCount++;
      // 3 tries total
      if (retryCount < maxRetries) {
        await new Promise(resolve => setTimeout( resolve, 2000 ));
      }
    }
  }

  throw new Error('Failed to fetch after maximum retries');
};


export default api;

