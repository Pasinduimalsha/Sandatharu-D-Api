const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const generateTokenAndSetCookie = require("../Utils/generateTokenAndSetCookie.js");

// Create a new expense
const signUp = async (req, res) => {

    const { email, password, name } = req.body;

    try {
        if (!email || !password || !name) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userAlreadyExists = await User.findOne({ email });
        console.log("userAlreadyExists", userAlreadyExists);

        if (userAlreadyExists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
         console.log("verificationToken", verificationToken);

        const user = await User.create({
            email,
            password: hashedPassword,
            name, 
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,// 24 hours
        });
        await user.save();

        //JWT 

        generateTokenAndSetCookie.genereteTokenAndSetCookie(res, user._id);
    
        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
            ...user._doc,
            password: undefined,
            }
        }) 
        
        

    }
    catch (error) {
        return res.status(400).json({ success: false, message: "error.messaage" })

    }

};

const login = async (req, res) => {

    res.send("login route");

};

const logout = async (req, res) => {

    res.send("logout route");

};

module.exports = {
    signUp,
    login,
    logout,
};

