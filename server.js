import express from "express";
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import connectDB  from './config/db.js';
import userRoutes from "./Routes/user.js";
import router from "./Routes/user.js";


/* Creating an instance of the express application. */
const app = express();

/* Loading the config.env file. */
dotenv.config({
    path: './config/config.env'
});

/* Connecting to the database. */
connectDB();

app.get('/', (req, res)=> {
    res.send("Welcome and this is surely going to be a completed app")
})
app.use('/api/users', userRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));