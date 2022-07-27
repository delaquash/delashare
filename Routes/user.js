import express from "express";
import  { updateUser, deleteUser, getUser, specificUser, subscribeUser, unsubcribedUser, likeUser, unlikeUser } from '../Controller/user.js';
import { verifyToken } from "../verifyToken.js";
const router = express.Router();

// add a user
// update user
router.put("/:id", verifyToken, updateUser)
// delete user
router.delete("/:id", deleteUser)
// get all user
router.get("/find", getUser )
// get specific user
router.get("/find/:id", specificUser)
// subscribe a user
router.put("/sub/:id", subscribeUser)
// unsubscribe a user
router.put("/unsub/:id", unsubcribedUser)
// like a user
router.put("/like/:videoId", likeUser)
// unlike a user
router.put("/unlike/:videoId", unlikeUser)




export default router; 