import mongoose from 'mongoose'

const doctorSchema = new mongoose.Schema({
    name : String,
    experience : String,
    specialization : String,
    contact : String,
    image : String,
})

const Doctor = mongoose.model("Doctor" , doctorSchema);

export default Doctor;