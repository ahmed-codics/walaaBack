import mongoose from 'mongoose'

const doctorSchema = new mongoose.Schema({
    name : String,
    experience : String,
    specialization : String,
    experience : String,
    contact : String,
    image : String,
    workingHours : String,
    location : String,
    reviews : Number,
})

const Doctor = mongoose.model("Doctor" , doctorSchema);

export default Doctor;
