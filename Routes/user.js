import express from "express";
import  { test } from '../Controller/user.js';
const router = express.Router()

// add a user
// update user
router.put("/:id")
// delete user
router.delete("/:id")
// get all user
router.get("/find")
// get specific user
router.get("/find/:id")
// subscribe a user
router.put("/sub/:id")
// unsubscribe a user
router.put("/unsub/:id")
// like a user
router.put("/like/:videoId")
// unlike a user
router.put("/unlike/:videoId")




export default router; 