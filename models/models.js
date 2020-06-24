var mongoose = require('mongoose')

let Schema = mongoose.Schema

let User = new Schema({
    username : { type : String,unique:[ true, 'a username already exists'], required:[true, ' this field is required']},
    password : { type: String, required : [true, ' this field is required']},
    email : { type : String ,required : [true, ' this field is required']  }
})

module.exports =  mongoose.model("User", User)
