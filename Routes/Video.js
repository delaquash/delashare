import express from "express";
import  { test } from '../Controller/video.js';
const router = express.Router()


router.get('/test', test )

export default router; 