import axios from 'axios';

const API_URL = process.env.API_URL || 'http://77.83.92.189';

export const getAllRoutes = async () => {
  try {
    const response = await axios.get(`${API_URL}/route/get-list`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all companys:', error);
    throw error;
  }
};

export const creatNewRoute = async (data: {
  transport_company: string;
  name: string;
  stops: string[];
  terminal_id: number;
  bus_number: string;
}) => {
  try {
    // console.log(data);
    const response = await axios.post(`${API_URL}/route/create`, data);
    return response.data;
  } catch (error) {
    console.error('Error fetching creat new company:', error);
    throw error;
  }
};
