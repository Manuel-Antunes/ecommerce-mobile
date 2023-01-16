import axios from 'axios';
import { store } from '../store';

const api = axios.create({
  baseURL: 'https://api.vivapenedo.com.br',
});

export default api;
