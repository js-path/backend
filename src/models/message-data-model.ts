import { LargeNumberLike } from "crypto";
import {Schema, model} from "mongoose";

interface MessageDataModel{
    message:string;
    username:string;
    registeredAt:Date;
    messageSentAt:number;
}

const MessageDataModel = new Schema<MessageDataModel>({
    message:{type:String},
    username:{type:String},
    registeredAt:{type:Date},
    messageSentAt:{type:Number}
})

const messageDataModel = model('messageData', MessageDataModel);

export {messageDataModel};