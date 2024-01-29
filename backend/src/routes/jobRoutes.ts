import express from 'express';
import { getJobs, getJob, getJobAbilities } from '../controllers/jobController';

const router = express.Router();

router.get('/jobs', getJobs);
router.get('/jobs/:job_id', getJob);
router.get('/jobs/:job_id/abilities', getJobAbilities);

export default router;
