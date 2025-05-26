import userModel from "../models/user.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import shopModel from "../models/shop.js";
import productModel from "../models/products.js";

const createToken = (id) => {
  return jwt.sign({ id }, "random#secret");
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    //check if the user already exists in the database
    const exists = await userModel.findOne({ email });

    if (exists) {
      return res.json({ success: false, message: "User Already Exists" });
    }

    //validating email format and password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Email is of invalid format",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password should be of atleast 8 characters",
      });
    }

    //encrypting(hashing) user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //adding new user to database
    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    await newUser.save();
    console.log("Registered new user");
    return res.json({ success: true, message: "Registered New User" });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid Email" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User Dosent Exists" });
    }

    const isMatch = bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Password dosent match" });
    }

    const token = createToken(user._id); //create a token for the logged in user
    const userDetails = { token, user, userType: "customer" };

    return res.json({ success: true, userDetails });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

export const searchItem = async (req, res) => {
  const { searchedItem } = req.body;
  const regex = new RegExp(searchedItem, "i"); //we use regular expression for case insensitive ,partial match

  try {
    //checking if the searched keyword is present in the shops database
    //for seaches using name of shop,city,address of shop
    const resultantShops = await shopModel.find({
      $or: [{ name: regex }, { city: regex }, { address: regex }],
    });

    //checking if the searched keyword is present in the products database
    //for seaches using name of the product
    let resultantProducts = await productModel
      .find({
        $or: [{ name: regex }],
      })
      .populate({ path: "shopId", select: "-password" });
    
      //filter the seacrh results so that only the items withs staus not equals hidden will be visible
    resultantProducts = resultantProducts.filter(
      (product) => product.status != "Hidden"
    );

    //extracting the shop details from the products
    resultantProducts = resultantProducts.map((product) => product.shopId);

    //concatenating both the results
    let results = resultantShops.concat(resultantProducts);

    const visited = new Set()
    results = results.filter(item => {
      if(visited.has(item._id)){
        return false
      }else{
        visited.add(item._id)
        return true
      }
    })

    return res.json({ success: true, results });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};
