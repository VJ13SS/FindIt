import dotenv from "dotenv"
import express from 'express'
import cors from 'cors'
import connectDb from './config/db.js'
import userRouter from './routes/userRoutes.js'
import shopRouter from './routes/shopRoutes.js'

//initialize express
const app = express()

//configure dotenv
dotenv.config()

//middlewares
app.use(cors())
app.use(express.json())

//connect to db
await connectDb()

//Routes
app.get('/',(req,res) => (res.send('API Working')))
app.use('/api/user',userRouter)
app.use('/api/shop',shopRouter)
app.use('/files',express.static('uploads'))

//port
const PORT = process.env.PORT

app.listen(PORT,() => {
    console.log(`http://localhost:${PORT}`)
})