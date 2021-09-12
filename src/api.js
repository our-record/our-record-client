import axios from 'axios';

export const API = 'localhost:4000';

const api = axios.create({
  baseURL: `http://${API}`,
  withCredentials: true,
});

export const getMainData = convertedDate => api.post('/', { convertedDate });

export const removeRecord = (convertedDate, id) =>
  api.post('/post/remove', { convertedDate, id });

export const removeAllRecord = convertedDate =>
  api.post('/post/remove-all', { convertedDate });

export const getDailyRecord = convertedDate =>
  api.post('/post/list', { convertedDate });

export const removeEvent = target => {
  api.post('/anniversary/remove', { _id: target });
};

export const postEvent = eventData => {
  api.post('/anniversary/write', eventData);
};

export const editEvent = eventData => {
  api.post('/anniversary/edit', eventData);
};
