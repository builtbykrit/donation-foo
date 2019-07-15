const axios = require('axios');

module.exports = axios.create({
    baseURL: 'https://5d7sxwww9k.execute-api.us-east-1.amazonaws.com/default/sketchyPatreonSearch',
    timeout: 10000,
});
