import mongoose from "mongoose";

const CompanySchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, "Name is necessary"],
        unique: true
    },
    email:{
        type: String,
        required: [true, "Email is necessary"],
        unique: true
    },
    address:{
        type: String,
        required: [true, "Address is necessary"],
        unique: true
    },
    phone:{
        type: String,
        required: [true, "Phone is necessary"],
        unique: true
    },
    category:{
        type: String,
        required: [true, "Category is necessary"]
    },
    impactLevel:{
        type: String,
        required: [true, "Impact Level is necessary"]
    },
    yearsExperiencie:{
        type: Number,
        required: [true, "Years of Experiencie is necessary"]
    },
    status:{
        type: Boolean,
        default: true
    }
});

export default mongoose.model('Company', CompanySchema); 
