import express from "express";
import  { googleAuth, signin, signup } from '../Controller/auth.js';
const router = express.Router()


//  Create a user
router.post('/signup', signup)

// user login
router.post('/signin', signin)

// google auth login
router.post('/google', googleAuth)


export default router;
