const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

router.get('/jobs', jobController.getJobs);
router.get('/jobs/:job_id', jobController.getJob);
router.get('/jobs/:job_id/abilities', jobController.getJobAbilities);

export default router;
