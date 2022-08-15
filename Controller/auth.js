import User from '../models/User.js';
import bcrypt from "bcryptjs";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";

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
        const isCorrect = await bcrypt.compare(req.body.password, user.password);
        if(!isCorrect) return next(createError(400, "Wrong credential!!!"));

        /* Creating a token for the user. */
        const token = jwt.sign({
                id: user._id
            }, process.env.JWT_SECRET);
        const { password, ...others } = user._doc
        
        /* Setting the cookie and sending the response. */
        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(others);
    } catch (err) {
        next(err)
    }
}

export const googleAuth =async(req, res, next) => {
    try {
      /* Checking if the user exists in the database. If the user exists, it will create a token for
      the user and set the cookie. */
        const user = await User.findOne({ email: req.body.email})
        if(user) {
            jwt.sign ({
                id: user._id
            }.process.env.JWT_SECRET);

            res.cookie("access_token", token, {
                httpOnly: true
            }).status(200).json(user._doc);
        } else {
            const newUser = new User({
                ...req.body,
                fromGoogle: true
            })
            const savedUser = newUser.save()
            jwt.sign ({
                id: savedUser._id
            }.process.env.JWT_SECRET);
            res.cookie("access_token", token, {
                httpOnly: true
            }).status(200).json(savedUser._doc);
        }
    } catch (err) {
        next(err)
    }
} 