const express = require('express')
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');

/* Loading the config.env file. */
dotenv.config({
    path: './config/config.env'
});

/* Connecting to the database. */
connectDB();

/* Creating an instance of the express application. */
const app = express();


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));