import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import morgan from "morgan"

import {router} from "./router/index"
import path  from "path"
import {Request, Response} from "express"

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use("/", express.static(path.join(__dirname, "/../src/public/home_page")));
app.use("/login", express.static(path.join(__dirname, "/../src/public/login")));
app.use("/register", express.static(path.join(__dirname, "/../src/public/register")));

app.use("/", router)

const start = async () => {
    try{
        app.listen(process.env.PORT, () => {
            console.log(`[+] server started on port ${process.env.PORT}`)
        })
        await mongoose.connect(process.env.MONGO_DB_CONNNECT_STRING, () => {
            console.log('\n[+] mongodb connected')
        })
    } catch (e) {
        console.log(e)
    }

}

start()