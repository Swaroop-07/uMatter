
import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async(req,res) => {
    const {email, password, firstName, lastName} = req.body;
    const checkUser = await User.findOne({email});
    if (checkUser)
    {
        res.status(406).json({message:"User is already exists"});
        return;
    }
    //hash the password
    const saltRounds = 10;
    const salt = await bcrypt.genSaltSync(saltRounds);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    console.log(hashedPassword)

    const user = await User ({email, password : hashedPassword, firstName, lastName});
    await user.save();
    res.status(201).json({message:"User is already created"});
}

export const login = async(req,res) => {
    const {email, password} = req.body;
    const userExist = await User.findOne({email});
    if (!userExist)
    {
        res.status(406).json({message:"Credentials not Found"});
        return;
    }
    const matched = await bcrypt.compare(password, userExist.password);
    if (!matched)
    {
        res.status(406).json({message:"Credentials not Found"});
        return; 
    }
    const payload = {
        username : email,
        _id: userExist._id
    }
    const token = jwt.sign({payload}, process.env.JWT_SECRET);
    res.status(200).json({message:"Succesfully logged In", token : token, user : userExist});
}