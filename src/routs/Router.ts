import * as express from "express";
const router = express.Router()
import {userController} from "../controllers/user-controller"
import {badgeController} from "../controllers/badge-controller";
import {check} from "express-validator"


router.post("/register",[
    check("name", "Անունը չպետք է լինի դատարկ։").isLength({min:1, max:15}),
    check("lastName", "Ազգանունը չպետք է լինի դատարկ։").isLength({min:1, max:25}),
    check("phoneNumber", "Հեռ․ համարը պետք  է պարունակի թվեր։").isLength({min:1, max:30}).isNumeric(),
    check("email", "Սխալ էլ․ հասցե։").isLength({min:1, max:30}).isEmail(),
    check("username", "Username ֊ը չպետք է լինի դատարկ։").isLength({min:1, max:20}),
    check("password", "Գաղտնաբառը պետք է լինի 10 նիշից երկար։").isLength({min:10, max:30})
], userController.registration)

router.post("/login", userController.login)

// posting badges

router.post('/badge', badgeController.posting)

// deleting badges
router.delete('/badge', badgeController.deleting)

// "_id" : ObjectId("62348730321248bf9d9f708b") for testing









// router.get('/badge/:id',(req,res)=>{
//    newBadge.findById(req.params.id)
//    .then(result =>{
// res.status(200).json({
//     newBadge:result
// })})
// .catch(
//     (err)=>{
//         res.status(500).json({error:err})
//  })
// });
// // delete badges

// router.delete('/badge', (req, res) => {
//         .findByIdAndDelete(req.params.id).then((  ) => {
//         if (!  ) {
//             return res.status(404).send();
//         }
//         res.send(   );
//     }).catch((err: any) => {
//         res.status(500).send(err);
//     })
// })

export {router}

