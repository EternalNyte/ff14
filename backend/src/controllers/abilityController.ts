import { Request, Response } from 'express';
import { connection } from '../db';

export const getAbilities = (req: Request, res: Response) => {
	connection.query('SELECT * FROM abilities', (error: any, results: any) => {
    if (error) {
      return res.status(500).json({ error: 'Internal Server Errors' });
    }
    res.json(results);
  });
};

