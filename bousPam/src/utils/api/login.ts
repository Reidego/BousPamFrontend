import axios from 'axios';
// import { config } from 'process';

const API_URL = process.env.API_URL || 'http://46.17.250.142';
export default async function getUserByLogin(data: {
  login: string;
  password: string;
}) {
  try {
    const response = await axios.put(`${API_URL}/login`, data);
    return response.data;
  } catch (error) {
    console.error('Error fetching user by login:', error);
    throw error;
  }
}
