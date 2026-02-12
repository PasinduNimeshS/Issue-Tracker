import api from './api';
import { type Issue } from '../types.ts';

export const getIssues = async (params: { search?: string; priority?: string; status?: string; page?: number; limit?: number }) => {
  const response = await api.get('/issues', { params });
  return response.data;
};

export const getIssueById = async (id: string) => {
  const response = await api.get(`/issues/${id}`);
  return response.data;
};

export const createIssue = async (data: Partial<Issue>) => {
  const response = await api.post('/issues', data);
  return response.data;
};

export const updateIssue = async (id: string, data: Partial<Issue>) => {
  const response = await api.put(`/issues/${id}`, data);
  return response.data;
};

export const deleteIssue = async (id: string) => {
  await api.delete(`/issues/${id}`);
};

export const getIssueCounts = async () => {
  const response = await api.get('/issues/counts');
  return response.data;
};