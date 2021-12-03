import * as express from "express";
import {Request, Response} from "express"
import path from "path"
const router = express.Router()
import {controller} from "./Controller"
import {check} from "express-validator"




router.post("/register",[
    check("name", "Անունը չպետք է լինի դատարկ։").isLength({min:1, max:15}),
    check("lastName", "Ազգանունը չպետք է լինի դատարկ։").isLength({min:1, max:25}),
    check("phoneNumber", "Հեռ․ համարը պետք  է պարունակի թվեր։").isLength({min:1, max:30}).isNumeric(),
    check("email", "Սխալ էլ․ հասցե։").isLength({min:1, max:30}).isEmail(),
    check("username", "Username ֊ը չպետք է լինի դատարկ։").isLength({min:1, max:20}),
    check("password", "Գաղտնաբառը պետք է լինի 10 նիշից երկար։").isLength({min:10, max:30})
], controller.registration)

router.post("/login", controller.login)

export {router}

