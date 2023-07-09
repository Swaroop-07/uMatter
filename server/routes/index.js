import {Router} from "express";
import authRoutes from './authAPI.js';
import userRoutes from './userAPI.js';
import transactionRoutes from './transactionAPI.js';
import blogRoutes from './blogAPI.js';
import passport from 'passport';
const router = Router();
router.use('/transaction',passport.authenticate("jwt", {session : false}), transactionRoutes);
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use("/blog", passport.authenticate("jwt", {session : false}), blogRoutes);

export default router;