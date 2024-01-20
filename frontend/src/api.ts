import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // Set the correct base URL
});

export default api;

