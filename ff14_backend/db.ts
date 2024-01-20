import mysql from 'mysql2';

export const connection = mysql.createConnection({
  host: 'localhost',
  user: 'ringo_ff14',
  password: 'ff14Pswd!',
  database: 'ff14'
});

connection.connect();

