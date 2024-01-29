import express from 'express';
import { getJobs, getJob, getJobAbilities } from '../controllers/jobController';

const router = express.Router();
router.get('/', getJobs);
router.get('/:job_id', getJob);
router.get('/:job_id/abilities', getJobAbilities);

export default router;

