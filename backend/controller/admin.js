const Admin = require('../model/admin');
const { createJwtToken } = require('../middleware/tokenManager');
const bcrypt = require('bcrypt');
require('dotenv').config();

exports.saveAdmin = async (req, res) => {
    const { email, password, name, phoneNumber } = req.body;

    try {
        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists with this email" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new admin
        const newAdmin = new Admin({
            name,
            email,
            password: hashedPassword,
            phoneNumber,
        });

        // Save the admin to the database
        await newAdmin.save();

        // Generate JWT token
        const token = createJwtToken({ adminId: newAdmin._id, email: newAdmin.email }, process.env.SECRET_KEY);
        if (!token) {
            console.error("Token generation failed");
            return res.status(500).json({ message: "Token generation failed" });
        }

        // Return success response with admin and token
        return res.status(200).json({ result: newAdmin, token, message: "Admin registered successfully" });
    } catch (error) {
        console.error("Error registering Admin:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.getAdmin = async (req, res) => {
    try {
        // Fetch all admins from the database
        const admins = await Admin.find();

        // Return success response with admins
        res.status(200).json({ result: admins, message: "Admins fetched successfully" });
    } catch (error) {
        // Return error response if an error occurs
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.getsingleAdmin = async (req, res) => {
    try {
        // Fetch single admin by ID from the database
        const admin = await Admin.findOne({_id: req.query._id});

        // Return success response with admin
        res.status(200).json({ result: admin, message: "Admin fetched successfully" });
    } catch (error) {
        // Return error response if an error occurs
        res.status(400).json({ message: "Admin not found" });
    }
};
