import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import {router} from "./routs/Router"
import path  from "path"
import {Request, Response} from "express"

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/", express.static(path.join(__dirname, "/../src/public/home_page")));
app.use("/login", express.static(path.join(__dirname, "/../src/public/login")));
app.use("/register", express.static(path.join(__dirname, "/../src/public/register")));





app.get("/test", (req:Request,res:Response):void => {
    res.send(JSON.stringify(path.join(__dirname, "/../src/public/homepage")))
})


app.use("/", router)

const start = async () => {
    try{
        app.listen(process.env.PORT, () => {
            // tslint:disable-next-line:no-console
            console.log(`[+] server started on port ${process.env.PORT}`)
        })
        await mongoose.connect(process.env.MONGO_DB_CONNNECT_STRING, () => {
            // tslint:disable-next-line:no-console
            console.log('\n[+] mongodb connected')
        })

    } catch (e) {
        // tslint:disable-next-line:no-console
        console.log(e)
    }

}

start()