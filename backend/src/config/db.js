import mongoose from 'mongoose'

export const ConnectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Success to connect to DB");
    }catch(error){
        console.error(error);
        process.exit(1);
    }
}