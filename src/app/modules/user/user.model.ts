import { Schema } from "mongoose";
import { TUser } from "./user.interface";


const userSchema = new Schema<TUser>({
firstName:{
    type:String,
    required:true,
    trim:true,
    minlength: [2, "First name must be at least 2 characters long"],
    maxlength: [50, "First name can't be more than 50 characters"],
    match: [/^[a-zA-ZÀ-ÿ\u00f1\u00d1'-\s]+$/, "First name contains invalid characters"],
},
lastName:{
    type:String,
    required:true,
    trim:true,
    minlength: [2, "Last name must be at least 2 characters long"],
    maxlength: [50, "Last name can't be more than 50 characters"],
    match: [/^[a-zA-ZÀ-ÿ\u00f1\u00d1'-\s]+$/, "Last name contains invalid characters"],
},
email:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    lowercase:true,
    validate:{
        validator:(value:string)=>{
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value);
        },
        message:"Please provide a valid email",
    },
},
password:{
    type:String,
    required:true,
    trim:true,
    minlength: [6, "Password must be at least 6 characters long"],
    maxlength: [50, "Password can't be more than 50 characters"],
},
role:{
    type:String,
    enum:["ADMIN","USER"],
    default:"USER",
},
})