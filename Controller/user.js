import User from "../models/User";

export const updateUser = async (req, res)=> {
    const newUser = await User.findByIdAndUpdate(req.body.)
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