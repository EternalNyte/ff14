import express from 'express';
import cors from 'cors';
import { getAbilities } from './controllers/abilityController';
import { getJobs } from './controllers/jobController';

const app = express();
const port = 3001;

app.use(cors());

app.get('/api/abilities', getAbilities);
app.get('/api/jobs', getJobs);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
