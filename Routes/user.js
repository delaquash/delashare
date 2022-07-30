import express from "express";
import  { addUser, updateUser, deleteUser, getUser, specificUser, subscribeUser, unsubcribedUser, likeUser, unlikeUser } from '../Controller/user.js';
import { verifyToken } from "../verifyToken.js";
const router = express.Router();

// add a user
router.post("/", verifyToken, addUser);
// update user
router.put("/:id", verifyToken, updateUser);
// delete user
router.delete("/:id",verifyToken, deleteUser);
// get all user
router.get("/find",verifyToken, getUser);
// get specific user
router.get("/find/:id", verifyToken, specificUser);
// subscribe a user
router.put("/sub/:id", verifyToken, subscribeUser)
// unsubscribe a user
router.put("/unsub/:id", verifyToken, unsubcribedUser)
// like a user
router.put("/like/:videoId", verifyToken, likeUser)
// unlike a user
router.put("/unlike/:videoId", verifyToken, unlikeUser)





export default router; 