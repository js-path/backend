import { LargeNumberLike } from "crypto";
import {Schema, model} from "mongoose";

interface MessageDataModel{
    content:string;
    author:string;
    id:string;
    messageSentAt:number;
}

const MessageDataModel = new Schema<MessageDataModel>({
    content:{type:String},
    author:{type:String},
    id:{type:String, unique:true},
    messageSentAt:{type:Number}
})

const messageDataModel = model('messageData', MessageDataModel);

export {messageDataModel};