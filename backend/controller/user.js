const User = require('../model/user');
const { createJwtToken } = require('../middleware/tokenManager');
const bcrypt = require('bcrypt');
require('dotenv').config();

exports.saveUser = async (req, res) => {
    const { email, password, name, phoneNumber } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phoneNumber,
        });
        await newUser.save();
        const token = createJwtToken({ userId: newUser._id, email: newUser.email }, process.env.SECRET_KEY);
        if (!token) {
            console.error("Token generation failed");
            return res.status(500).json({ message: "Token generation failed" });
        }
            return res.status(200).json({ result:newUser,token, message: "User registered successfully" });
        
        
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.getUser = async (req, res) => {

    try {
        const user = await User.find();
        res.status(201).json({result:user,message:"User fetched successfully"});
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

exports.getsingleUser=async(req,res)=>{

    try {
        const user = await User.findById({ _id: req.query._id });
       
        res.status(200).json({result:user,message:"User fetched successfully"});
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}