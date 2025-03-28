import axios from 'axios';

const API_URL = process.env.API_URL;

export const getCompanyByCompanyName = async (companyName: string) => {
  try {
    const response = await axios.get(`${API_URL}/users?login=${companyName}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching company by companyName:', error);
    throw error;
  }
};

export const getAllCompanys = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all companys:', error);
    throw error;
  }
};

export const creatNewCompany = async (data: any) => {
  try {
    const response = await axios.post(`${API_URL}/users`, data);
    return response.data;
  } catch (error) {
    console.error('Error fetching creat new company:', error);
    throw error;
  }
};
