import {Request, Response, NextFunction} from "express"
import {UserBadgeModel} from "../models/user-badge-model"

class UserBadgeRel{
    async userBadgeTableCreateing(res: Response, next : NextFunction){
        const newUserBadgeRel = new UserBadgeModel({

        })
}
}
