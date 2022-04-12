import {tokenService} from '../service/token-service';
import {Request, Response, NextFunction} from "express"

export default function (req:Request, res:Response, next:NextFunction) {
    try {
        console.log(JSON.stringify(req.headers))
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return res.status(400).json({message: 'Դուք լօգին եղած չեք։'})
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return res.status(400).json({message: 'Դուք լօգին եղած չեք։'})
        }

        const userData = tokenService.validate(accessToken);
        if (!userData) {
            return res.status(400).json({message: 'Դուք լօգին եղած չեք։'})
        }

        next();
    } catch (e) {
        return res.status(400).json({message: 'Դուք լօգին եղած չեք։'})
    }
};
