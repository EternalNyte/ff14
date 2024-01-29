import {createConnection} from 'mysql2';

export const connection = createConnection({
  host: 'localhost',
  user: 'ringo_ff14',
  password: 'ff14Pswd!',
  database: 'ff14'
});

connection.connect();

