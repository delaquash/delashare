import { createError } from "../error.js";
import User from "../models/User.js";
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
        /* Finding the video by the id and increasing the views by 1. */
        await Video.findByIdAndUpdate(req.params.id, {
            $inc: {views: 1}
        })
        res.status(201).json("Views has been increased successfully!")
    } catch (err) {
        next(err)
    }
}

export const random= async(req, res, next)=> {
    try {
        /* Getting 40 random videos from the database. */
        const videos = await Video.aggregate([{$sample : { size: 40}}])
        res.status(200).json(videos)
    } catch (err) {
        next(err)
    }
}

export const trend = async(req, res, next)=> {
    try {
        /* Sorting the videos by the highest views. */
        const videos = await Video.find().sort({ views: -1})
        res.status(200).json(videos)
    } catch (err) {
        next(err)
    }
}

export const sub = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)
        const subscribedChannels = await user.subscribedUsers

       /* Getting all the videos from the subscribed channels. */
        const list =await Promise.all(
            subscribedChannels.map((channelId) => {
                return Video.find({userId : channelId })
            })
        )
        res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
    } catch (err) {
        next(err)
        // console.log(err);
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