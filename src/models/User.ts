import {Schema, model} from "mongoose";

interface User{
    name:string;
    lastName:string;
    phoneNumber:string;
    email:string;
    username:string;
    password:string
}

const schema = new Schema<User>({
    name:{type:String, required:true},
    lastName:{type:String, required:true},
    phoneNumber:{type:String, required:true},
    email:{type:String, required:true},
    username:{type:String, unique:true, required:true},
    password:{type:String, required:true},
})
const userModel = model('User', schema);
export {userModel};