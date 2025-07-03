import axios from 'axios';

const BASE_URL = 'http://192.168.1.21:3001';

// this all functions are
export const getTreatments = () => {
  return axios.get(`${BASE_URL}/treatments`);
};


export const addTreatment = (treatment) => {
  return axios.post(`${BASE_URL}/treatments`, treatment);
};

export const deleteTreatment = (id) => {
  return axios.delete(`${BASE_URL}/treatments/${id}`);
};