import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    userName:{type:String,required:true},
    userEmail:{type:String,required:true},
    userContact:{type:Number,required:true},
    items:{type:Array,required:true},
    shopId:{type:String,required:true},
    shopName:{type:String,required:true},
    shopEmail:{type:String,required:true},
    shopContact:{type:Number,required:true},
    shopImage:{type:String,required:true},
    date:{type:Date,default:Date.now()},
    status:{type:String,default:'Pending'}
})


const bookingModel = mongoose.models.bookings || mongoose.model('bookings',bookingSchema)


export default bookingModel