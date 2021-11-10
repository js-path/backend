const Router = require('express')
const router = new Router()
const controller = require('./Controller')
const {check} = require('express-validator')


router.get("/", (req, res) => {
    res.sendFile(path.resolve('public/index.html'))
})

router.get("/register", (req, res) => {
    res.sendFile(path.resolve('public/register/index.html'))
})

router.get("/login", (req, res) => {
    res.sendFile(path.resolve('public/login/index.html'))
})

router.post('/register',[
    check('name', 'Անունը չպետք է լինի դատարկ։').isLength({min:1, max:15}),
    check('lastName', 'Ազգանունը չպետք է լինի դատարկ։').isLength({min:1, max:25}),
    check('phoneNumber', 'Հեռ․ համարը պետք  է պարունակի թվեր։').isLength({min:1, max:30}).isNumeric(),
    check('email', 'Սխալ էլ․ հասցե։').isLength({min:1, max:30}).isEmail(),
    check('username', "Username ֊ը չպետք է լինի դատարկ։").isLength({min:1, max:20}),
    check('password', "Գաղտնաբառը պետք է լինի 10 նիշից երկար։").isLength({min:10, max:30})
], controller.registration)

router.post('/login', controller.login)

module.exports = router

