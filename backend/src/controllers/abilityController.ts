import { Request, Response } from 'express';
import { connection } from '../db';
import { RowDataPacket } from 'mysql2/promise';

export const getAbilities = (req: Request, res: Response) => {
  const jobIds = req.query.job_ids as string;
  if (jobIds) {
    const ids = jobIds.split(',').map((id) => parseInt(id, 10));
    connection.query('SELECT * FROM abilities WHERE job_id IN (?)', [ids], (error: any, results: RowDataPacket[]) => {
      if (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json(results);
    });
  } else {
    connection.query('SELECT * FROM abilities', (error: any, results: RowDataPacket[]) => {
      if (error) {
        return res.status(500).json({ error: 'Internal Server Errors' });
      }
      res.json(results);
    });
  }
};

