import mongoose from "mongoose";

const shopSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    address:{type:String,required:true},
    contact:{type:Number,required:true,unique:true},
    city:{type:String,required:true},
    image:{type:String,required:true},
})

const shopModel = mongoose.models.shop || mongoose.model('shop',shopSchema)

export default shopModel