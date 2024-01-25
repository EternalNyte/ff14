import express from 'express';
import cors from 'cors';
import { getAbilities } from './controllers/abilityController';
import { getJobs, getJob, getJobAbilities } from './controllers/jobController';

const app = express();
const port = 3001;

app.use(cors());

app.get('/api/abilities', getAbilities);
app.get('/api/jobs', getJobs);
app.get('/api/jobs/:job_id', getJob);
app.get('/api/jobs/:job_id/abilities', getJobAbilities);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
