import Blog from "../models/Blog.js";
import CryptoJS from "crypto-js";
export const index = async(req, res) => {
    const blogs = await Blog.find();
    res.json({data: blogs})
}

export const create = async(req, res) => {
    const ida = req.user._id;
    const id = String(ida);
    const secretPass = "XkhZG4fW2t2W";
    const EncryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(id),
    secretPass
    ).toString();
    console.log("En", EncryptedData)
    //const bytes = CryptoJS.AES.decrypt(EncryptedData, secretPass);
    const dataaa = JSON.parse((CryptoJS.AES.decrypt(EncryptedData, secretPass)).toString(CryptoJS.enc.Utf8));
    console.log("data", dataaa)
    const {title, subtitle, description, datePost} = await req.body;
    const blogs = new Blog({
        title, 
        subtitle, 
        description, 
        datePost,
        user_id : EncryptedData,
        firstName : req.user.firstName,
        lastName : req.user.lastName
    })
    await blogs.save();
    res.json({data: blogs})
    }

export const remove = async(req,res) => {
    await Blog.deleteOne({_id:req.params.id})
    res.json({message: "Delete Succesfully"})
}

export const update = async(req,res) => {
    await Blog.updateOne({_id:req.params.id},{ $set : req.body})
    res.json({message: "Updated Succesfully"})
}

export const like = async(req,res) => {
    await Blog.findByIdAndUpdate(req.body.postId, {
        $push:{likes:req.user._id}
    },
    {
        new:true
    }).exec();
    res.json({message: "Liked Succesfully"})
}

export const unlike = async(req,res) => {
    await Blog.findOneAndUpdate(req.body.id, {
        $pull:{likes:req.user._id}
    },
    {
        new:true
    }).exec();
    res.json({message: "UnLiked Succesfully"})
}