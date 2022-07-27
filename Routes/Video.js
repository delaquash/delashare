import express from "express";
import  { addVideo, updateVideo, getVideo, deleteVideo } from '../Controller/video.js';
import { verifyToken } from "../verifyToken.js";
const router = express.Router()

router.get('/', verifyToken, addVideo )
router.get('/:id', verifyToken, updateVideo )
router.get('/find/:id' , getVideo )
router.get('/:id', verifyToken, deleteVideo )

export default router; 