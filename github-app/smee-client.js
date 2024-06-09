const SmeeClient = require('smee-client');
const axios = require('axios');
const https = require('https');

const agent = new https.Agent({
  rejectUnauthorized: false, // Disable SSL certificate validation
});

const smee = new SmeeClient({
  source: 'https://smee.io/cfoZ4E7W7BF11He',
  target: 'http://localhost:3000/events',
  logger: console,
  request: {
    // Use axios with the custom HTTPS agent
    post: (url, data, config) => axios.post(url, data, { ...config, httpsAgent: agent }),
  },
});

smee.start();

console.log('Smee client started. Forwarding events from https://smee.io/cfoZ4E7W7BF11He to http://localhost:3000');
