import {Schema, model} from "mongoose";

interface Badges{
    badgeName:string;
    icon:string; // url to icon
    shortcut:string;
}

const BadgesSchema = new Schema<Badges>({
    badgeName:{type:String},
    icon:{type:String},
    shortcut:{type:String, unique:true}
})

const badgesModel = model('Badges', BadgesSchema);
export {badgesModel};