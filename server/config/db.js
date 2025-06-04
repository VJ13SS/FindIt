import mongoose from "mongoose";

//function to connect to db
const connectDb = async () => {
    mongoose.connection.on('connected',()=>console.log('DB Connecetd'))

    await mongoose.connect(process.env.DATABASE_URL)
}

export default connectDb