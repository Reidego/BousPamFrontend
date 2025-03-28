import axios from 'axios';

const API_URL = process.env.API_URL;

export const getCashierByName = async (name: string) => {
  try {
    const response = await axios.get(`${API_URL}/users?login=${name}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching cashier by name:', error);
    throw error;
  }
};

export const getAllCashiers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all Cashier:', error);
    throw error;
  }
};

export const creatNewCashier = async (data: any) => {
  try {
    const response = await axios.post(`${API_URL}/users`, data);
    return response.data;
  } catch (error) {
    console.error('Error fetching create Cashier:', error);
    throw error;
  }
};
