import dotenv from 'dotenv';
import {createConnection} from 'mysql2';

export const connection = createConnection({
  host: process.env.HOST,
  user: process.env.SQL_USERNAME,
  password: process.env.SQL_PW,
  database: process.env.SQL_DB
});

connection.connect();

