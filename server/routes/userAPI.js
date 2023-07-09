import { Router } from "express";
import passport from "passport";
import User from "../models/User.js"
const router = Router();
router.get('/:id', passport.authenticate("jwt", {session : false}), async(req,res) => {
    const users = await User.findOne({_id:req.params.id});
    res.json({firstName : users.firstName, lastName : users.lastName})
})
export default router;