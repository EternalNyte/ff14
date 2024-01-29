import express from 'express';
import cors from 'cors';
import mainRoutes from './routes/mainRoutes';

const app = express();
const port = 3001;

app.use(cors());
app.use('/api', mainRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

