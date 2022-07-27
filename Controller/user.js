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
        } catch (error) {
            next(err)
        }
    } else {
        return next(createError(403, "You can update only your account!"))
    }
    
};
export const deleteUser = (req, res)=> {
    res.send("All is working")
};
export const getUser = (req, res)=> {
    res.send("All is working")
};
export const specificUser = (req, res)=> {
    res.send("All is working")
};
export const subscribeUser = (req, res)=> {
    res.send("All is working")
};
export const unsubcribedUser = (req, res)=> {
    res.send("All is working")
};
export const  likeUser = (req, res)=> {
    res.send("All is working")
};
export const unlikeUser = (req, res)=> {
    res.send("All is working")
};