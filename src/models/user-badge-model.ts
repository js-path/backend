import {Schema, model} from "mongoose";
import { type } from "os";
interface UserBadge{
    user:Schema.Types.ObjectId;
    badges?:Schema.Types.ObjectId;
}

const UserBadgeSchema = new Schema<UserBadge>({
    user :{type : Schema.Types.ObjectId , ref: 'User'} ,
    badges : {type : Schema.Types.ObjectId , ref: 'Badges'}
})

const UserBadgeModel = model('UserBadge', UserBadgeSchema)


export {UserBadgeModel};