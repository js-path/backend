const {Schema, model} = require('mongoose')

const User = new Schema({
    name:{type:String, required:true},
    lastName:{type:String, required:true},
    phoneNumber:{type:String, required:true},
    email:{type:String, required:true},
    username:{type:String, unique:true, required:true},
    password:{type:String, required:true},
})

module.exports = model('User', User)