import {validationResult} from "express-validator"
import {Request, Response} from "express"
import {userModel as User} from "./models/User"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import {secretKey} from "./config"

const generateToken = (id:number, username:string) => {
    const payload = {
        id, username
    }
    return jwt.sign(payload, secretKey, {expiresIn:"12H"})
}

class Controller {
    async registration(req:Request, res:Response) {
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({message:"Գրանցման էռորները ", errors})
            }
            const {name, lastName, phoneNumber, email, username, password} = req.body
            const candidate = await User.findOne({username})
            if(candidate){
                return res.status(400).json({message:"Username ֊ը զբաղված է։"})
            }
            const hashedPasswd = bcrypt.hashSync(password, 10);
            const user = new User({name, lastName, phoneNumber, email, username, password:hashedPasswd})
            await user.save()
            return res.json({message:"Դուք հաջողությամբ գրանցվել եք։"})
        } catch(e){
            // tslint:disable-next-line:no-console
            console.log(e)
            res.status(400).json({message: 'Գրանցման ընթացքում սխալ է տեղի ունեցել։'})
        }
    }

    async login(req:Request, res:Response) {
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
            const token = generateToken(user._id, user.username)
            return res.json({token})
        } catch(e){
            // tslint:disable-next-line:no-console
            console.log(e)
            res.status(400).json({message: 'Լօգինի ընթացքում սխալ է տեղի ունեցել'})
        }
    }

}

const controller = new Controller()
export {controller}