import axios from 'axios';
import { SERVER_PATH } from './config';

axios.defaults.baseURL = SERVER_PATH;
axios.defaults.withCredentials = true;
