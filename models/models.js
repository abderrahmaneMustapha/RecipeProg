var mongoose = require('mongoose')

let Schema = mongoose.Schema

let User = new Schema({
    username : { type : String, required:true},
    password : { type: String, required: true},
    email : { type : String , required:true  }
})