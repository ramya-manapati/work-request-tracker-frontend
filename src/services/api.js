import axios from 'axios';

const API_BASE = 'https://localhost:7110/api/WorkRequests';

export const getWorkRequests = (status, search) =>
  axios.get(API_BASE, { params: { status, search } });

export const getWorkRequestById = (id) =>
  axios.get(`${API_BASE}/${id}`);

export const createWorkRequest = (data) =>
  axios.post(API_BASE, data);

export const updateStatus = (id, status) =>
  axios.patch(`${API_BASE}/${id}/status`, { status });

export const addNote = (id, note) =>
  axios.post(`${API_BASE}/${id}/notes`, { content: note });
