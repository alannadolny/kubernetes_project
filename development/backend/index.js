const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todo = require('./routes');
const client = require('./client');

const conf = {
  PORT: process.env.PORT || 5000,
  MONGO_PORT: process.env.MONGO_PORT || 27017,
  MONGO_HOST: process.env.MONGO_HOST || 'localhost',
};

const app = express();
app.use(express.json());
app.use(cors());
app.use('/todo', todo);

app.listen(conf.PORT, () => {
  console.log(`App listening on port ${conf.PORT}`);
  mongoose
    .connect(`mongodb://${conf.MONGO_HOST}:${conf.MONGO_PORT}/projekt_tc`)
    .then(() => {
      console.log('Connected to mongoDB');
    });
  client.on('connect', () => {
    console.log(`Connected to Redis.`);
  });
});
