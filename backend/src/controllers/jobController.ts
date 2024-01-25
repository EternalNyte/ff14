import { Request, Response } from 'express';
import { connection } from '../db';

interface JobResult {
  id: number;
  name: string;
  short_name: string;
  role: string;
}

export const getJobs = (req: Request, res: Response) => {
	connection.query('SELECT * FROM jobs', (error: any, results: JobResult[]) => {
    if (error) {
      return res.status(500).json({ error: 'Internal Server Errors' });
    }
    res.json(results);
  });
};

