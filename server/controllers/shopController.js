import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import validator from 'validator'
import shopModel from "../models/shop.js"


const createToken = (id) => {
    return jwt.sign({id},"random#secret")
}

export const shopSignIn = async (req,res) => {
    const {name,email,password,address,city,contact} = req.body
    const imageFile = `${req.file.filename}`

    try {
        if(!validator.isEmail(email)){
            return res.json({success:false,message:'Email is of Invalid Format'})
        }

        const shopExists = await shopModel.findOne({email})

        if(shopExists){
            return res.json({success:false,message:'Shop Already Registered'})
        }

        if(password.length < 8){
            return res.json({success:false,message:'Password Should be of Minimum 8 characters'})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newShop = new shopModel({
            name:name,
            email:email,
            password:hashedPassword,
            address:address,
            city:city,
            contact:contact,
            image:imageFile
        })

        await newShop.save()

        console.log('Shop Registered Successfully')

        return res.json({success:true,message:'Shop Registered Successfully'})
    } catch (error) {
        console.log(error.message)
        return res.json({success:false,message:error.message})
    }
}

export const shopLogin = async (req,res) => {
    const {email,password} = req.body
    

    try {
        if(!validator.isEmail(email)){
            return res.json({success:false,message:'Email is of invalid format'})
        }

        const shop = await shopModel.findOne({email})

        if(!shop){
            return res.json({success:false,message:'Shop Not Registered'})
        }

        const token = createToken(shop._id)
        const userDetails = {token,user:shop, userType: "shop"}

        return res.json({ success: true, userDetails });
    } catch (error) {
        return res.json({ success: false, message:error.message });
    }
}