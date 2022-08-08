import {Schema, model} from "mongoose";

interface MessageDataModel{
    content:string;
    authorId:string;
    id:string;
    messageSentAt:number;
}

const MessageDataModel = new Schema<MessageDataModel>({
    content:{type:String},
    authorId:{type:String},
    id:{type:String, unique:true},
    messageSentAt:{type:Number}
})

const messageDataModel = model('messageData', MessageDataModel);

export {messageDataModel};