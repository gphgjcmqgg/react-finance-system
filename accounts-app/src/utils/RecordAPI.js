import axios from 'axios';

console.log(process.env.REACT_APP_RECORDS_API_URL);
const api = process.env.REACT_APP_RECORDS_API_URL || "https://5a54227777e1d20012fa0723.mockapi.io/api/v1";

export const getAllData = () => axios.get(`${api}/records`);