import express from "express";
import  { addVideo, updateVideo, sub,search, tags, getVideo, deleteVideo,trend, random, addView } from '../Controller/video.js';
import { verifyToken } from "../verifyToken.js";
const router = express.Router()

router.post("/", verifyToken, addVideo)
router.put("/:id", verifyToken, updateVideo )
router.put('/view/:id', verifyToken, addView )
router.get('/find/:id', getVideo)
// router.get('/find', getVideo)
router.get('/trend', trend)
router.get('/random' , random)
router.get('/search' , search)
router.get('/tags' , tags)
router.get('/subscription', verifyToken , sub )
router.delete("/:id", verifyToken, deleteVideo )

export default router; 