import { createError } from "../error.js";
import User from "../models/User.js";
import Video from "../models/Video.js";

export const addUser = async (req, res, next)=> {
    const newUser = new User(req.body)
    try {
        const addUser = await newUser.save()
        res.status(200).json(addUser)
    } catch (err) {
        next(err)
    }
}

export const updateUser = async (req, res, next)=> {
    if(req.params.id === req.user.id){
        try {
            const updateUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, {
                new: true
            });
            res.status(200).json(updateUser)
        } catch (err) {
            next(err)
        }
    } else {
        return next(createError(403, "You can update only your account!"))
    }
    
};
export const deleteUser = async (req, res, next)=> {
    if(req.params.id === req.user.id) {
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("User has been deleted successfully.")
        } catch (err) {
            next(err)
        }   
    } else {
        return next(createError(403, "You can only delete your account"))
    }
};
export const getUser = async(req, res, next)=> {
    try {
        /* Getting all the users from the database. */
        const getUser = await User.find()
        res.status(200).json(getUser)
    } catch (err) {
        next(err)
    }
};
export const specificUser = (req, res, next)=> {
    if(req.param.id === req.user.id) {
        try {
            
        } catch (error) {
            
        }
    } else {

    }
};
export const subscribeUser = async (req, res, next)=> {
    try {
         await User.findByIdAndUpdate(req.user.id, {
            /* Pushing the `req.params.id` into the `User` model. */
            $push : { subscribedUser:req.params.id}
         })

         /* Incrementing the `subscribers` by 1. */
         await User.findByIdAndUpdate(req.params.id, {
            $inc: {subscribers : 1}
         })
         res.status(200).json("Subscription Successfull!")
    } catch (err) {
        next(err)
    }
};
export const unsubcribedUser = async (req, res, next)=> {
    try {
        await User.findByIdAndUpdate(req.user.id, {
           /* Removing the `req.params.id` from the `subscribedUser` array. */
           $pull : { subscribedUser:req.params.id}
        })

        /* Decrementing the `subscribers` by -1. */
        await User.findByIdAndUpdate(req.params.id, {
           $inc: {subscribers : -1}
        })
        res.status(200).json("Unsubscribe Successfully!")
   } catch (err) {
       next(err);
   }
};
export const  likeUser = async (req, res, next)=> {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: { likes: id },
            $pull: {dislikes: id}
        })
        res.status(200).json("This video has been liked!!!")
    } catch (err) {
        next(err)
    }
};
export const unlikeUser = async (req, res, next)=> {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
        await Video.findByIdAndUpdate(videoId, {
            /* Adding the `id` to the `dislikes` array. */
            $addToSet: { dislikes: id },

            /* Removing the `id` from the `likes` array. */
            $pull: {likes: id}
        })
        res.status(200).json("This video has been disliked!!!")
    } catch (err) {
        next(err)
    }
};