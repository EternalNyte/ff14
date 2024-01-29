import { Request, Response } from 'express';
import { queryAndJson } from '../utils/dbUtils';

export const getJobs = (req: Request, res: Response) => {
  const jobIds = req.query.job_ids as string;

  let query: string;
  let params: number[][] | undefined;
  if (jobIds) {
    query = 'SELECT * FROM jobs WHERE id IN (?)';
    params = [jobIds.split(',').map((id) => parseInt(id, 10))];
  } else {
    query = 'SELECT * FROM jobs';
  }
  queryAndJson(query, res, params);
};


export const getJob = (req: Request, res: Response) => {
  const jobId = req.params.job_id;
  const query = 'SELECT * FROM jobs WHERE id=?';
  queryAndJson(query, res, [[jobId]]);
};

export const getJobAbilities = (req: Request, res: Response) => {
  const jobId = req.params.job_id;
  const query = 'SELECT * FROM abilities WHERE job_id=?';
  queryAndJson(query, res, [[jobId]]);
};

