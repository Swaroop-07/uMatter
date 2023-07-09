import mongoose from "mongoose";
const {Schema} = mongoose;
const blogSchema = new Schema({
    title: {type: String, required:["Title field is required"]},
    subtitle: {type: String, required:["Sub Title field is required"]},
    description: {type: String, required:["Description field is required"]},
    datePost : {type : String, required:["Date field is required"]},
    user_id : {type: String},
    firstName : {type: String},
    lastName : {type: String},
    likes :[{type:mongoose.Types.ObjectId, ref:"User"}]
});

export default new mongoose.model("Blog", blogSchema);