import { createError } from "../error.js";
import User from "../models/User.js";


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
        res.send("All is working")
    } catch (error) {
        
    }
};
export const specificUser = (req, res, next)=> {
    res.send("All is working")
};
export const subscribeUser = (req, res, next)=> {
    res.send("All is working")
};
export const unsubcribedUser = (req, res, next)=> {
    res.send("All is working")
};
export const  likeUser = (req, res, next)=> {
    res.send("All is working")
};
export const unlikeUser = (req, res, next)=> {
    res.send("All is working")
};