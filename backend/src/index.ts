import express from 'express';
import cors from 'cors';
import abilityRoutes from './routes/abilityRoutes';
import jobRoutes from './routes/jobRoutes';

const app = express();
const port = 3001;

app.use(cors());
app.use('/api', abilityRoutes);
app.use('/api', jobRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
