import {Schema, model} from "mongoose";

interface User{
    name:string;
    lastName:string;
    email:string;
    phoneNumber:string;
    username:string;
    password:string;
    badges: Schema.Types.ObjectId;
    points: number;
}

const UserSchema = new Schema<User>({
    name:{type:String, required:true},
    lastName:{type:String, required:true},
    email:{type:String, unique:true, required:true},
    phoneNumber:{type:String, required:true},
    username:{type:String, unique:true, required:true},
    password:{type:String, required:true},
    badges:{type:Schema.Types.ObjectId, ref:'Badges'},
    points:{type:Number}

})

const userModel = model('User', UserSchema);
export {userModel};