import {Schema, model} from "mongoose";

interface Point{
    user:Schema.Types.ObjectId;
    point:number;
    timestamp:Date;
    reason:string;
}

const PointSchema = new Schema<Point>({
    user:{type:Schema.Types.ObjectId, ref:'User'},
    point:{type:Number},
    timestamp:{type:Date, default:new Date()},
    reason:{type:String}
})

const pointModel = model('Point', PointSchema);
export {pointModel};