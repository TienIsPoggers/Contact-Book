import mongoose  from "mongoose";

const contactSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true
        },
        phoneNumber:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            lowercase:true
        },
        address:{
            type:String,
            required:true
        },
        note:{
            type:String,
        },
        image:{
            data:Buffer,
            contentType:String
        }
    },
    {timestamps:true}
)

const contacts = mongoose.model('contacts',contactSchema)

export default contacts