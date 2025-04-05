import Doctor from "../models/DoctorModel.js"
import mongoose from "mongoose";

export const fetchDocs = async (req , res) => {
    try {
        const doctors = await Doctor.find();
        res.json(doctors)
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

export const getDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) res.status(404).json({message : "Doctor Not Found!"});
        res.json(doctor);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

export const addDoctor = async (req, res) => {
    try {
        const {name , specialization , experience , contact} = req.body;
        const imageUrl = req.file ? req.file.path : '';

        const newDoctor = new Doctor({
            name,
            specialization,
            experience,
            contact,
            image: imageUrl,
        });

        await newDoctor.save();
        res.status(201).json(newDoctor);
    } catch (error) {
        console.error("❌ Error in addDoctor:", error); // Log the real error
        res.status(500).json({ message: "Error adding doctor", error });
    }
};

export const deleteDoctor = async (req , res) => {
    try {
        const {id} = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({message : "invalid ID format"});
        }

        const deletingDoctor = await Doctor.findByIdAndDelete(id);

        if (!deletingDoctor) {
            res.status(404).json({message : "Doctor Not Found!"})
        }

        res.json({message : "Doctor Deleted!"})

    } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
    }
}

