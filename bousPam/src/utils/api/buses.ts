import axios from 'axios';

const API_URL = process.env.API_URL || 'http://46.17.250.142';

export const getAllBuses = async () => {
  try {
    const response = await axios.get(`${API_URL}/buses/get-list`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all Cashier:', error);
    throw error;
  }
};

export const creatNewBus = async (data: {
  number: string;
  companyName: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/buses/create`, {
      number: data.number,
      company_name: data.companyName,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching create Cashier:', error);
    throw error;
  }
};
