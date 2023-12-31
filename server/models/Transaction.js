import mongoose from "mongoose";
const {Schema} = mongoose;

const transactionSchema = new Schema({
    amount : Number,
    name : String,
    user_id : mongoose.Types.ObjectId,
    date : {type : Date, default : new Date()},
    createdAt : {type : Date, default : Date.now}
});

export default new mongoose.model("Transaction", transactionSchema);