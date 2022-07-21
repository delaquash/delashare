import express from "express";
import  { signup } from '../Controller/auth.js';
const router = express.Router()


//  Create a user
router.post('/signup', signup)

// user login
router.post('/signin')

// google auth login
router.post('/google')


export default router;
