const axios = require('axios');
console.log(process);
const API_KEY = process.env.PATREON_API_KEY;
const APP_ID = process.env.PATREON_APP_ID;
const PATREON_API_ENDPOINT = process.env.PATREON_API_ENDPOINT;

module.exports = axios.create({
    baseURL: PATREON_API_ENDPOINT,
    timeout: 10000,
    headers: {
        'X-Algolia-API-Key': API_KEY,
        'X-Algolia-Application-Id': APP_ID,
    }
});
