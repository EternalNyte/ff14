import { Request, Response } from 'express';
import { connection } from '../db';
import { RowDataPacket } from 'mysql2/promise';

export const getJobs = (req: Request, res: Response) => {
  const jobIds = req.query.job_ids as string;
  if (jobIds) {
    const ids = jobIds.split(',').map((id) => parseInt(id, 10));
    connection.query('SELECT * FROM jobs WHERE id IN (?)', [ids], (error: any, results: RowDataPacket[]) => {
      if (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json(results);
    });
  } else {
    connection.query('SELECT * FROM jobs', (error: any, results: RowDataPacket[]) => {
      if (error) {
        return res.status(500).json({ error: 'Internal Server Errors' });
      }
      res.json(results);
    });
  }
};


export const getJob = (req: Request, res: Response) => {
  const jobId = req.params.job_id;
  connection.query('SELECT * FROM jobs WHERE id=?', [jobId], (error: any, results: RowDataPacket[]) => {
    if (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(results);
  });
};

export const getJobAbilities = (req: Request, res: Response) => {
  const jobId = req.params.job_id;
	connection.query('SELECT * FROM abilities WHERE job_id=?', [jobId], (error: any, results: RowDataPacket[]) => {
    if (error) {
      return res.status(500).json({ error: 'Internal Server Errors' });
    }
    res.json(results);
  });
};

