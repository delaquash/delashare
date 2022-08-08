import express from "express";
import dotenv from 'dotenv';
import colors from 'colors';
/* Creating a schema for the user model. */
import morgan from 'morgan';
import connectDB  from './config/db.js';
import userRoutes from "./Routes/user.js";
import videoRoutes from "./Routes/video.js";
import commentRoutes from "./Routes/comment.js";
import authRoutes from "./Routes/auth.js";
import cookieParser from "cookie-parser";



/* Creating an instance of the express application. */
const app = express();


/* Loading the config.env file. */
dotenv.config({
    path: './config/config.env'
});

/* Connecting to the database. */
connectDB();

/* A middleware that parses the incoming request body and makes it available as a property on the
request object. */
app.use(cookieParser());
app.use(express.json());


/* A route handler. */
app.get('/', (req, res)=> {
    res.send("Welcome and this is surely going to be a completed app")
})
app.use('/api/users', userRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
    const status = err.status || 500
    const message = err.message || "Something went wrong"
    return res.status (status).json({
        success: false,
        message,
        status
    })
})

// 

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.underline.bold));