import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"; dotenv.config()
import cookieParser from "cookie-parser"
import cors from "cors"
import {router} from "./router/index"

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(express.urlencoded({extended:true}))

app.use("/api", router)


const start = async () => {
    try{
        const PORT = process.env.PORT || 5000
        app.listen(PORT, () => {
            // tslint:disable-next-line:no-console
            console.log(`[+] server started on port ${PORT}`)
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