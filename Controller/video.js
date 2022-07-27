import { createError } from "../error.js";
import Video from "../models/Video.js";

export const addVideo = async (req, res, next)=> {
    /* Creating a new video and saving it to the database. */
    const newVideo = new Video({ userId: req.body.id, ...req.body})
    try {
        const savedVideo = await Video.save()
        res.status(200).json(savedVideo)
    } catch (err) {
        next();
    }
};
export const updateVideo = async (req, res, next)=> {
    
};
export const getVideo = async (req, res, next)=> {
    res.send("All is working")
};
export const deleteVideo = async (req, res, next)=> {
    res.send("All is working")
};
