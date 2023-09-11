import axios from 'axios';

const api = axios.create({
  baseURL: 'https://mfe.ffit.com.br/mock/coopApp/'
});

export default api;