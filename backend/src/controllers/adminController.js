import User from "../models/userModel.js";

export const userFetch = async (req , res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    
    }
}

