import { Response } from 'express';
import { connection } from '../db';
import { QueryError, RowDataPacket } from 'mysql2/promise';

export const queryAndJson = (query: string, res: Response, values?: (number | string)[][], errorStr?: string) => {
  errorStr = errorStr || "Internal Server Error";

  const queryCallback = (error: QueryError, results: RowDataPacket[]) => {
    if (error) {
      return res.status(500).json({ error: errorStr });
    }
    res.json(results);
  };

  if (values) {
    connection.query(query, values, queryCallback);
  } else {
    connection.query(query, queryCallback);
  }
}

