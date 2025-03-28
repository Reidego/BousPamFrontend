import axios from 'axios';

const API_URL = process.env.API_URL;

export default async function getUserByLogin(data: {
  login: string;
  password: string;
}) {
  try {
    const response = await axios.get(
      `${API_URL}/users?login=${data.login}&password=${data.password}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching user by login:', error);
    throw error;
  }
}
