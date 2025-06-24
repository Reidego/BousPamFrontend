import axios from 'axios';

const API_URL = process.env.API_URL || 'http://46.17.250.142';

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
    const response = await axios.get(`${API_URL}/company/get-list`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all companys:', error);
    throw error;
  }
};

export const creatNewCompany = async (data: {
  name: string;
  owner_name?: string;
  owner_surname?: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/company/create`, data);
    return response.data;
  } catch (error) {
    console.error('Error fetching creat new company:', error);
    throw error;
  }
};
