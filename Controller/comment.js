import { createError } from "../error.js";
import Comment from '../models/Comment.js';
import Video from "../models/Video.js"


export const addComment = async (req, res)=> {
    const newComment = new Comment({...req.body, userId: req.user.id})
    try {
        const savedComment =await newComment.save()
        res.status(200).json(savedComment) 
    } catch (err) {
        next(err)
    }
};
export const deleteComment = async (req, res)=> {
    try {
        /* Finding the video by the id and assigning it to the variable Video. */
       const comment = await Comment.findById(req.params.id);
       const video = await Video.findById(req.params.id);
       if(!comment) return next(createError(404, "Comment not found!"));

       if (req.user.id === comment.userId || req.user.id === video.userId){
        await Comment.findByIdAndDelete(req.params.id)
        res.status(200).json("Comment has been deleted successfully!");
       }else {
            return next(createError(403, "You can only delete your video"))
       }
    } catch (err) {
        next(err)
    }
};
export const getComment = async (req, res)=> {
    try {
       const comment = await Comment.findById({video: req.params.videoId}) 
       res.status(200).json(comment)
    } catch (err) {
        next(err)
    }
};

// export const getComment = async (req, res)=> {
//     try {
//        const comment = await Comment.find()  
//        res.status(200).json(comment)
//     } catch (err) {
//         next(err)
//     }
// };