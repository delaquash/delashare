import express from "express";
import  { addVideo, updateVideo, getVideo, deleteVideo } from '../Controller/video.js';
import { verifyToken } from "../verifyToken.js";
const router = express.Router()

router.post('/', verifyToken, addVideo )
router.put('/:id', verifyToken, updateVideo )
router.put('/view/:id', verifyToken, viewideo )
router.get('/find/:id' , getVideo )
router.get('/trend' , trendVideo )
router.get('/random' , randomVideo )
router.get('/sub' , subVideo )
router.delete('/:id', verifyToken, deleteVideo )

export default router; 