import { Request, Response } from 'express';
import { connection } from '../db';
import { RowDataPacket } from 'mysql2/promise';

export const getAbilities = (req: Request, res: Response) => {
	connection.query('SELECT * FROM abilities', (error: any, results: RowDataPacket[]) => {
    if (error) {
      return res.status(500).json({ error: 'Internal Server Errors' });
    }
    res.json(results);
  });
};

