import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {  // Fixed parameter name (req instead of requestAnimationFrame)
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;

        if (!fullName || !username || !password || !confirmPassword || !gender) {
            return res.status(400).json({ message: "All fields are required!!" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: "Username already exists!!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        await User.create({
            fullName,
            username,
            password: hashedPassword,
            profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,  // Fixed: gender should be compared with string "male"
            gender
        });

        return res.status(201).json({ message: "Account created successfully!" });  // Added success response
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });  // Added error response
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        };

        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Invalid username or password" });
            success: false
        };

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid username or password" });
            success: false
        };

        // Generate token (if using JWT)
        const tokenData = {
            userId: user._id
        };
        // Return user data (excluding password)
        const userData = {
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePhoto: user.profilePhoto,
            gender: user.gender
        };
        const token = await jwt.sign(tokenData, process.env.JWT_SCRET_KEY, { expiresIn: '1d' });

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httponly: true, sameSite: 'strict' }).json({
            message: "Logged in successfully",
            user: userData,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const logout = (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0, }).json({
            message: "Logged out succesfully."
        })
    } catch (error) {
        console.log(error);
    }
}

export const getOtherUser = async (req, res) => {
    try {
        const loggedInUserId = req.user?.id || req.id; 
        const otheUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        return res.status(200).json(otheUsers);
    } catch (error) {
        console.log(error);
    }
}