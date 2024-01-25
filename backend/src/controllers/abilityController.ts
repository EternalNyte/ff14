import { Request, Response } from 'express';
import { connection } from '../db';

interface AbilityResult {
  id: number;
  name: string;
  recast: number;
  duration: number;
  type: string;
  amount: string;
  target: string;
  job_id: number;
}

export const getAbilities = (req: Request, res: Response) => {
	connection.query('SELECT * FROM abilities', (error: any, results: AbilityResult[]) => {
    if (error) {
      return res.status(500).json({ error: 'Internal Server Errors' });
    }
    res.json(results);
  });
};

