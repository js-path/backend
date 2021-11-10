const express = require('express')
const mongoose = require('mongoose')
const Router = require('./Router')
const path = require('path')

const app = express()

app.use(express.json())
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))

app.use("/", Router)

const start = async () => {
    try{
        await mongoose.connect(process.env.MONGO_DB_CONNNECT_STRING)
        console.log('\n[+] mongodb connected')
        app.listen(process.env.PORT, () => console.log(`[+] server started on port ${process.env.PORT}`))
    } catch (e) {
        console.log(e)
    }

}

start()