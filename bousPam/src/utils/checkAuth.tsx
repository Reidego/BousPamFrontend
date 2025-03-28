import axios from 'axios';

export default async function checkAuth() {
  const API_URL = process.env.API_URL;
  const user = localStorage.getItem('user');
  const password = localStorage.getItem('password');

  if (!user || !password) {
    return false; // No credentials found
  }

  const response = await axios.get(
    `${API_URL}/users?login=${user}&password=${password}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (response.data) {
    return true; // Authenticated
  } else {
    return false; // Not authenticated
  }
}
