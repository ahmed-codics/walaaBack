import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    doctorName : {
        type:String,
        required:true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId ,
        ref: "User" ,
        required:true
    },
    date : {
        type:String,
        required:true
    },
    time : {
        type : String,
        required : true
    },
    consultationFee : {
        type: Number,
        default : 50
    },

} , {timestamps : true});

export default mongoose.model("Booking" , bookingSchema);