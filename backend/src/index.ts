import express from 'express';
import cors from 'cors';
import { getJobs, getJob, getJobAbilities } from './controllers/jobController';
import abilityRoutes from './routes/abilityRoutes';

const app = express();
const port = 3001;

app.use(cors());
app.use('/api', abilityRoutes);
app.get('/api/jobs', getJobs);
app.get('/api/jobs/:job_id', getJob);
app.get('/api/jobs/:job_id/abilities', getJobAbilities);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
