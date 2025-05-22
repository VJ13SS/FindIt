import userModel from "../models/user.js";
import validator from "validator";
import bcrypt from "bcrypt";

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
