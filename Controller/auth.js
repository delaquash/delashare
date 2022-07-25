import mongoose from "mongoose";
import User from '../models/User.js';
import bcrypt from "bcryptjs";
import { createError } from "../error.js";


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

export const signin= async (req, res, next)=> {  
    try {
        /* Checking if the user exists in the database. */
        const user = await User.findOne({name: req.body.name})
        if(!user) return next(createError(404, "User not found!!!"));  
        
        /* Comparing the password that the user entered with the password that is stored in the
        database. */
        const isCorrect = await bcrypt.compare(req.body.password, user.name);
        if(!isCorrect) return next(createError(400, "Wrong credential!!!"))
    } catch (err) {
        next(err)
    }
}