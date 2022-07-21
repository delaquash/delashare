import mongoose from "mongoose";
import User from '../models/User.js';
import bcrypt from "bcryptjs";


export const signup= async (req, res, next)=> {
    /* Creating a new user and saving it to the database. */
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = User({...req.body, password: hash})
        await newUser.save();
        res.status(201).send("User has been successfully created");
    } catch (err) {
        next(err)
    }
}