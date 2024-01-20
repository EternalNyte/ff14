import express from 'express';
import cors from 'cors';
import { getAbilities } from './controllers/abilityController';

const app = express();
const port = 3001;

app.use(cors());

app.get('/api/abilities', getAbilities);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
