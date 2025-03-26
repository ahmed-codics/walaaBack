import Doctor from "../models/DoctorModel.js"

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

export const addDoctor = async (req , res) => {
    try {
        const newDoctor = new Doctor({
            name,
            specialization,
            experience,
            contact,
            image: req.file ? `/uploads/${req.file.filename}` : "",
        });

        const savedDoctor = await newDoctor.save();
        res.status(201).json(savedDoctor);
    } catch (error) {
        res.status(500).json({ message: "Error adding doctor", error });
    }
}
