import { LargeNumberLike } from "crypto";
import {Schema, model} from "mongoose";

interface Members{
    username:string;
    points:number;
    id:string;
    registeredAt:Date;
}

const MemberSchema = new Schema<Members>({
    username:{type:String,unique:true},
    points:{type:Number},
    id:{type:String,unique:true},
    registeredAt:{type:Date}
})

const memberModel = model('Member', MemberSchema);

export {memberModel};