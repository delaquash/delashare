import { createError } from "../error.js";
import Video from "../models/Video.js";

export const addVideo = async (req, res, next)=> {
    /* Creating a new video and saving it to the database. */
    const newVideo = new Video({ userId: req.body.id, ...req.body})
    try {
        const savedVideo = await newVideo.save()
        res.status(200).json(savedVideo)
    } catch (err) {
        next(err);
    }
};
export const updateVideo = async (req, res, next)=> {
    try {
       /* Finding the video by the id and assigning it to the variable Video. */
       const video = await Video.findById(req.params.id) 
        if(!video) return next(createError(404, "Video not found!"))
        if(req.user.id === video.userId){
                const updatedVideo = await Video.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                }, 
                {
                    new: true
                });
                res.status(201).json(updatedVideo)     
        } else {
            return next(createError(403, "You can update only your video"))
        }
    } catch(err) {
        next(err)
    }
}

export const getVideo = async (req, res, next)=> {
    try {
        const video = await Video.findById(req.params.id)
        // const video = await Video.find()
        res.status(200).json(video)
    } catch (err) {
        next(err)
    }
};

export const addView = async(req, res, next)=> {
    try {
        await Video.findByIdAndUpdate(req.params.id, {
            $inc: {views: 1}
        })
        res.status(201).json("Views has been increased successfully!")
    } catch (err) {
        next(err)
    }
}

export const deleteVideo = async (req, res, next)=> {
    try {
       /* Finding the video by the id and assigning it to the variable Video. */
       const video = await Video.findById(req.params.id);
         if(!video) return next(createError(404, "Video not found!"))

         /* Checking if the user is the owner of the video. */
         if(req.user.id === video.userId){
                 await Video.findByIdAndDelete(req.params.id)
                 res.status(200).json("Video has been deleted successfully!!!")
              
         } else {
             return next(createError(403, "You can delete only your video!!"))
         }
     } catch(err) {
         next(err)
     }
}