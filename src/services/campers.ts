import { api } from './api';

export async function getCampers() {
  const response = await api.get('/campers');

  return response.data;
}
