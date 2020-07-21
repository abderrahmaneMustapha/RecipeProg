var mongoose = require('mongoose')

let Schema = mongoose.Schema

let User = new Schema({
    username : { type : String,unique:[ true, 'a username already exists'], required:[true, ' this field is required']},
    password : { type: String, required : [true, ' this field is required']},
    email : { type : String ,required : [true, ' this field is required']  }
})

let Recipe = new Schema({
    name: { type : String, required:[true, ' this field is required']},
    username : {type: User , required:[true,' this field is required' ]}, 
    rating  : {type: Number, min: [-1, 'rating must be positive'],max:5}

})

user= mongoose.model("User", User)
module.exports =  { user , recipe}
