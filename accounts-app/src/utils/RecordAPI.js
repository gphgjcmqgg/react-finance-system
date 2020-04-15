import axios from 'axios';

const api = process.env.REACT_APP_RECORDS_API_URL || "https://5a54227777e1d20012fa0723.mockapi.io/api/v1";

export const getAllData = () => axios.get(`${api}/records`);

export const createData = (data) => axios.post(`${api}/records`, data);

export const update = (id, data) => axios.put(`${api}/records/${id}`, data);

export const remove = (id) => axios.delete(`${api}/records/${id}`);