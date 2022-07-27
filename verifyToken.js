import jwt from "jsonwebtoken";
import { createError } from "./error.js";


export const verifyToken = (req, res, next)=> {
    /* Getting the token from the cookie. */
    const token = req.cookies.access_token
    if(!token) return next(createError(401, "You are not authenticated"));

    jwt.verify(token, process.env.JWT_SECRET, (err, user)=> {
        if(err) return next(createError(401, "Invalid token"));
        req.user = user;
        next()
    })
}