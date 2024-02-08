import dotenv from 'dotenv';
import path from 'path';

// Construct the path to the .env file
const envPath = path.resolve(__dirname, '../../.env');

// Load environment variables from the .env file
dotenv.config({ path: envPath });

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

