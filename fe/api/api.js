import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8080' });

export const fetchTeachers = (page, limit) => API.get(`/teachers?page=${page}&limit=${limit}`);
export const createTeacher = (data) => API.post('/teachers', data);
export const fetchPositions = () => API.get('/teacher-positions');
export const createPosition = (data) => API.post('/teacher-positions', data);


