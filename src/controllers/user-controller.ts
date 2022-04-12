import {validationResult} from "express-validator"
import {Request, Response, NextFunction} from "express"
import {userService} from "../service/user-service"


class UserController {
    async registration(req:Request, res:Response, next:NextFunction) {
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({message:"Գրանցման էռորները ", errors})
            }
            const serverResponse = await userService.registration(req, res, next)
            return serverResponse
        } catch(e){
            console.log(e)
            res.status(400).json({message: 'Գրանցման ընթացքում սխալ է տեղի ունեցել։'})
            next()
        }
    }

    async login(req:Request, res:Response, next:NextFunction) {
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({message:"Լօգինի էռորները ", errors})
            }
            const serverResponse = await userService.login(req, res, next);
            return serverResponse
        } catch(e){
            console.log(e)
            res.status(400).json({message: 'Լօգինի ընթացքում սխալ է տեղի ունեցել'})
            next()
        }
    }

    async activate(req:Request, res:Response, next:NextFunction) {
        try {
            const serverResponse = await userService.activate(req, res, next);
            return serverResponse
        } catch (e) {
            console.log(e)
            next();
        }
    }

    async getUsers(req:Request, res:Response, next:NextFunction) {
        try {
            const users = await userService.getAllUsers();
            return res.json(users);
        } catch (e) {
            next(e);
        }
    }
}

const userController = new UserController()
export {userController}