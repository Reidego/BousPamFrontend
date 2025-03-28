import axios from 'axios';

const API_URL = process.env.API_URL;

export const getTerminalByCompanyName = async (companyName: string) => {
  try {
    const response = await axios.get(`${API_URL}/users?login=${companyName}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching terminal by company name:', error);
    throw error;
  }
};

export const getAllTerminals = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all terminals:', error);
    throw error;
  }
};

export const creatNewTerminal = async (data: any) => {
  try {
    const response = await axios.post(`${API_URL}/users`, data);
    return response.data;
  } catch (error) {
    console.error('Error fetching create new terminal:', error);
    throw error;
  }
};
