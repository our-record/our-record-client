import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true,
});

export const getMainData = convertedDate => api.post('/', { convertedDate });

export const postRecord = recordData =>
  api.post(`/post/write`, {
    data: recordData,
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
  });

export const removeRecord = (convertedDate, id) =>
  api.post('/post/remove', { convertedDate, id });

export const removeAllRecord = convertedDate =>
  api.post('/post/remove-all', { convertedDate });

export const getDailyRecord = convertedDate =>
  api.post('/post/list', { convertedDate });
