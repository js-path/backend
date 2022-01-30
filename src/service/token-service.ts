import jwt from "jsonwebtoken"


class TokenService {
    async generate(id:number, username:string){
        const payload = {
            id, username
        }
        return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn:"12H"})
    }

    validate(token:string) {
        try {
            // tslint:disable-next-line:no-console
            console.log(token)

            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;

        } catch (e) {
            return null;
        }
    }


}


const tokenService = new TokenService()
export{tokenService}