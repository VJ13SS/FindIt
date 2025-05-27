import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import shopModel from "../models/shop.js";
import productModel from "../models/products.js";
import eventModel from "../models/events.js";
import bookingModel from "../models/bookings.js";

const createToken = (id) => {
  return jwt.sign({ id }, "random#secret");
};

export const shopSignIn = async (req, res) => {
  const { name, email, password, address, city, contact } = req.body;
  const imageFile = `${req.file.filename}`;

  try {
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Email is of Invalid Format",
      });
    }

    const shopExists = await shopModel.findOne({ email });

    if (shopExists) {
      return res.json({ success: false, message: "Shop Already Registered" });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password Should be of Minimum 8 characters",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newShop = new shopModel({
      name: name,
      email: email,
      password: hashedPassword,
      address: address,
      city: city,
      contact: contact,
      image: imageFile,
    });

    await newShop.save();

    console.log("Shop Registered Successfully");

    return res.json({ success: true, message: "Shop Registered Successfully" });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

export const shopLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Email is of invalid format",
      });
    }

    const shop = await shopModel.findOne({ email });

    if (!shop) {
      return res.json({ success: false, message: "Shop Not Registered" });
    }

    const token = createToken(shop._id);
    const userDetails = { token, user: shop, userType: "shop" };

    return res.json({ success: true, userDetails });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const addProduct = async (req, res) => {
  const { product, price } = req.body;
  const productImage = `${req.file.filename}`;

  const shopId = req.shop._id;

  try {
    const newProduct = new productModel({
      name: product,
      price: price,
      image: productImage,
      shopId: shopId,
    });

    await newProduct.save();
    console.log("Product Added Successfully");
    return res.json({ success: true, message: "Product Added Successfully" });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

export const addShopEvents = async (req, res) => {
  const { description } = req.body;
  const eventImage = `${req.file.filename}`;

  const shopId = req.shop._id;
  try {
    const newEvent = new eventModel({
      image: eventImage,
      description: description,
      shopId: shopId,
    });

    await newEvent.save();
    console.log("Event Added Successfully");
    return res.json({ success: true, message: "Event Added Successfully" });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const shopId = req.shop._id;

    const products = await productModel.find({ shopId });
    return res.json({ success: true, products });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

export const changeProductStatus = async (req, res) => {
  try {
    const { product_id, status } = req.body;

    await productModel.findByIdAndUpdate({ _id: product_id }, { status });
    console.log("Product Status Updated Successfully");
    return res.json({
      success: true,
      message: "Product Status Updated Successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

export const getEvents = async (req, res) => {
  try {
    const shopId = req.shop._id;
    const events = await eventModel.find({ shopId });
    return res.json({ success: true, events });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

export const changeEventStatus = async (req, res) => {
  try {
    const { event_id, status } = req.body;

    await eventModel.findByIdAndUpdate({ _id: event_id }, { status: status });
    console.log("Event Status Updated Successfully");
    return res.json({
      success: true,
      message: "Event Status Updated Successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

export const getAllShops = async (req, res) => {
  try {
    const shops = await shopModel.find({});

    return res.json({ success: true, shops });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

export const getShopById = async (req, res) => {
  const { shopId } = req.body;
  
  try {
    const shop = await shopModel.findOne({_id:shopId });
    const shopProducts = await productModel.find({ shopId });
    const displayProducts = shopProducts.filter(product => product.status != "Hidden")
    
    const shopEvents = await eventModel.find({ shopId });
    const displayEvents = shopEvents.filter(event => event.status != "Hidden")
    const shopDetails = { shop, displayProducts, displayEvents };
   
    return res.json({ success: true, shopDetails });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

export const getAllBookingOrders = async (req,res) => {
  try {
    const shopId = req.shop._id
    const bookingOrders = await bookingModel.find({shopId})

    return res.json({success:true,bookingOrders})
  } catch (error) {
    console.log(error.message)
    return res.json({success:false,message:error.message})
  }
}

export const changeBookingOrderStatus = async (req,res) => {
  try {
    const {bookingId,status} = req.body

    await bookingModel.findByIdAndUpdate({_id:bookingId},{status})
    console.log('Booking Order status updated successfully')

    return res.json({success:true,message:'Booking Order status updated successfully'})
  } catch (error) {
    console.log(error.message)
    return res.json({success:false,message:error.message})
  }
}
