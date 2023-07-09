import mongoose from 'mongoose';

const connect = async() => {
    
await mongoose.connect(`mongodb+srv://blackhorse:blackhorse123@cluster0.kl5wsge.mongodb.net/?retryWrites=true&w=majority`);
console.log("MongoDB Connection is succesful");

}
export default connect;