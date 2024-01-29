import { Request, Response } from 'express';
import { queryAndJson } from '../utils/dbUtils';

export const getAbilities = (req: Request, res: Response) => {
  const jobIds = req.query.job_ids as string;

  let query: string;
  let params: number[][] | undefined;
  if (jobIds) {
    query = 'SELECT * FROM abilities WHERE job_id IN (?)';
    params = [jobIds.split(',').map((id) => parseInt(id, 10))];
  } else {
    query = 'SELECT * FROM abilities';
  }
  queryAndJson(query, res, params);
};

