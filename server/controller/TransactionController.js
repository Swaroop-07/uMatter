
import Transaction from '../models/Transaction.js';
export const index = async(req,res) => {
    const id = req.user._id
    const transaction = await Transaction.find({user_id : id}).sort({date : -1});
    res.json({data:transaction});
}
export const create = async (req,res) => {
    const id = req.user._id
    const {amount, name, date} = req.body;
    const transaction = new Transaction({
        amount,
        name, 
        date,
        user_id : id
    });
    await transaction.save();
    res.json({message : "Transaction Success"});
}
export const remove = async(req,res) => {
    await Transaction.deleteOne({_id:req.params.id})
    res.json({message: "Delete Succesfully"})
}

export const update = async(req, res) => {
    await Transaction.updateOne({_id:req.params.id},{ $set : req.body});
    res.json({message: "Update Succesfully"});
}
