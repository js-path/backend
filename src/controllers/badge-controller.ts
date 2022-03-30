import {Request, Response, NextFunction} from "express"
import {badgeModel} from "../models/badges-model"

class BadgeController{
    async posting(req:Request, res:Response, next:NextFunction){
        // tslint:disable-next-line:no-console
        console.log("ekav")

        const newBadge = new badgeModel({
            badgeName : req.body.badgeName,
            icon : req.body.icon,
            shortcut : req.body.shortcut
        })

        await newBadge.save()
        .then((badge)=>res.status(200).json(badge))
        .catch((err)=>{
            res.status(500).json(err)
            console.log(err);
        })
        // tslint:disable-next-line:no-console
        console.log("pahec")
    }

   async deleting(req:Request,res:Response,next:NextFunction){
        badgeModel.findByIdAndDelete(req.body._id)
        .then(()=>res.status(200).json({message:"badge deleted"}))
        .catch((err)=>{
            res.status(500).json(err)
            console.log(err)
        })
    }
}


const badgeController = new BadgeController()
export {badgeController}
