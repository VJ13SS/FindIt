import mongoose from "mongoose";

//function to connect to db
const connectDb = async () => {
    mongoose.connection.on('connected',()=>console.log('DB Connecetd'))

    await mongoose.connect('mongodb://localhost:27017/find-it')
}

export default connectDb