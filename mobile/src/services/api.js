import axios from 'axios';
import urlProvider from '../utils/urlProvider';

const url = urlProvider();

const api = axios.create({
    baseURL: url
});

export default api;