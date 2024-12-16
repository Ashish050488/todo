import mongoose from "mongoose";

const connectToDb =  async ()=>{
    await mongoose.connect(process.env.MongoUri).then ((res)=>{
        console.log('db has been connected');
        
    })
}

export default connectToDb;