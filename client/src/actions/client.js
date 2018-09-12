const axios = require('axios');

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/v1'
});

module.exports = axiosInstance;
