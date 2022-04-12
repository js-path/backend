import {userModel as User} from "../models/user-model"
import {registerModel as Register} from "../models/register-model"
import bcrypt from "bcrypt"
import {Request, Response, NextFunction} from "express"
import {mailService} from "./mail-service"
import {tokenService} from "./token-service"
import { v4 as uuidv4 } from "uuid"


class UserService {
    async registration(req:Request, res:Response, next:NextFunction){
        try {
            const {name, lastName, email, phoneNumber, username, password} = req.body
            const ifUsername = await User.findOne({username})
                        if(ifUsername){
                return res.status(400).json({message:"Username ֊ը զբաղված է։"})
            }
            const ifEmail = await User.findOne({email})
            if(ifEmail){
                return res.status(400).json({message:`${email} ֊ը արդեն գրանցված է։`})
            }
            const hashedPasswd = bcrypt.hashSync(password, 10);
            const activationLink = uuidv4();
            const registerUser = new Register({name, lastName, email, phoneNumber, username, password:hashedPasswd, activationLink})
            await registerUser.save()

            mailService.sendMail(email, activationLink)
            return res.status(200).json({message:`Գնացեք ${email} և հաստատեք գրանցումը`})
        } catch (error) {
            console.log(error)
            next()
        }
    }

    async login(req:Request, res:Response, next:NextFunction) {
        try{
            const {username, password} = req.body
            const user = await User.findOne({username})
            if(!user){
                return res.status(400).json({message:`Օգտատեր ${username} ֊ը չի գտնվել։`})
            }
            const validPasswd = bcrypt.compareSync(password, user.password)
            if(!validPasswd){
                return res.status(400).json({message:'Գաղtնաբառը սխալ է։'})
            }
            const token = await tokenService.generate(user._id, user.username)
            console.log(token)
            res.json({token})
        } catch(e){
            console.log(e)
            res.status(400).json({message: 'Լօգինի ընթացքում սխալ է տեղի ունեցել'})
            next()
        }
    }


    async activate(req:Request, res:Response, next:NextFunction) {
        const activationLink = req.params.link;
        const user = await Register.findOne({activationLink})
        if (!user) {
            return res.send("Ակտիվացման սխալ հղում։")
        }
        const {name, lastName, email, phoneNumber, username, password} = user
        const newUser = new User({name, lastName, email, phoneNumber, username, password})
        await newUser.save();
        await Register.deleteOne({activationLink})
        return res.send("Դուք հաջողությոմբ գրանցվել եք")
    }

    async getAllUsers() {
        const users = await User.find();
        return users;
    }
}

const userService = new UserService()
export{userService}


