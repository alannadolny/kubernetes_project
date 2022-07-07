const redis = require('ioredis');

const client = new redis({
  port: process.env.REDIS_PORT || 6379,
  host: process.env.REDIS_HOST || '127.0.0.1',
});

module.exports = client;
