import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // URL do backend
});

export const audioService = {
  upload: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/audio/upload', formData);
  },
  getAll: () => api.get('/audio'),
};
