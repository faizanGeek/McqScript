const express = require('express');
const mongoose = require('mongoose');

const questions = require('./controller/questions');
const app = express();

// mongoose connection
mongoose.connect('mongodb://localhost/mydb');

mongoose.connection.on('error', (error) => {
  console.log(error);
});
mongoose.connection.once('open', () => {
  console.log('connected to database');
});

// USE MIDDLEWARE
app.use(questions);

// server started
PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log('started');
});
