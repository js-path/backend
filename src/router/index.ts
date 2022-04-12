import * as express from "express";
import {userController} from "../controllers/user-controller"
import {check} from "express-validator"
import authMiddleware from '../middlewares/auth-middleware'
import {badgeController} from "../controllers/badge-controller";

const router = express.Router()

router.post("/registration",[
    check("name", "Անունը չպետք է լինի դատարկ։").isLength({min:1, max:15}),
    check("lastName", "Ազգանունը չպետք է լինի դատարկ։").isLength({min:1, max:25}),
    check("phoneNumber", "Հեռ․ համարը պետք  է պարունակի թվեր։").isLength({min:1, max:30}).isNumeric(),
    check("email", "Սխալ էլ․ հասցե։").isLength({min:1, max:30}).isEmail(),
    check("username", "Username ֊ը չպետք է լինի դատարկ։").isLength({min:1, max:20}),
    check("password", "Գաղտնաբառը պետք է լինի 10 նիշից երկար։").isLength({min:10, max:30})
], userController.registration)

router.post("/login", [
    check("username", "Գրեք username ֊ը։").isLength({min:1, max:20}),
    check("password", "Գրեք գաղտնաբառը։").isLength({min:1, max:30})
], userController.login)

router.get("/activate/:link", userController.activate)
router.get("/users", authMiddleware, userController.getUsers)


router.post('/badge', badgeController.posting)
router.delete('/badge', badgeController.deleting)

export {router}

