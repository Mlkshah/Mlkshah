import { io } from 'socket.io-client';
import { API_BASE_URL } from './api';

const origin = API_BASE_URL.replace('/api', '');
export const socket = io(origin, { autoConnect: false });
