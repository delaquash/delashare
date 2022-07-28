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
    try {
       /* Finding the video by the id and assigning it to the variable Video. */
       const Video = await Video.findById(req.params.id) 
        if(!video)next(createError(404, "Video not found!"))
        if(req.user.id === video.userId){
                const updateVideo = await User.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                }, {
                    new: true
                });
                res.status(200).json(updateVideo)
             
        } else {
            return next(createError(403, "You can update only your video!!"))
        }
    } catch(err) {
        next(err)
    }
};


export const getVideo = async (req, res, next)=> {
    res.send("All is working")
};
export const deleteVideo = async (req, res, next)=> {
    res.send("All is working")
};
