import {Schema, model} from "mongoose";

interface Register{
    name:string;
    lastName:string;
    email:string;
    phoneNumber:string;
    username:string;
    password:string;
    activationLink:string;
}

const RegisterSchema = new Schema<Register>({
    name:{type:String, required:true},
    lastName:{type:String, required:true},
    email:{type:String, unique:false, required:true},
    phoneNumber:{type:String, required:true},
    username:{type:String, unique:false, required:true},
    password:{type:String, required:true},
    activationLink:{type:String, required:true}
})

const registerModel = model('Register', RegisterSchema);
export {registerModel};
