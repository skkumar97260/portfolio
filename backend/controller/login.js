const User = require('../model/user');
const Admin = require('../model/admin');
const { createJwtToken } = require('../middleware/tokenManager');
const bcrypt = require('bcrypt');
require('dotenv').config();

exports.authenticateUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        let user = await User.findOne({ email });
        let isAdmin = false;

        if (!user) {
            // Check if admin exists
            user = await Admin.findOne({ email });
            isAdmin = true;
        }

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = createJwtToken({ userId: user._id, email: user.email }, process.env.SECRET_KEY);

        // Attach the token and user info to the request object
        req.user = user;
        req.token = token;

        // Determine login success message based on user type
        const loginMessage = isAdmin ? "Admin login successful" : "User login successful";

        return res.status(200).json({ result:user, token, message: loginMessage });
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};