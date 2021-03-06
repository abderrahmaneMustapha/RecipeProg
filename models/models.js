var mongoose = require('mongoose')

let Schema = mongoose.Schema

let User = new Schema({
    username : { type : String,unique:[ true, 'a username already exists'], required:[true, ' this field is required']},
    password : { type: String, required : [true, ' this field is required']},
    email : { type : String ,required : [true, ' this field is required']  }
})

let Recipe = new Schema({
    name: { type : String, required:[true, ' this field is required']},
    notes: { type : String, required:[true, ' this field is required']},
    username : {type: String ,unique:false, required:[true,' this field is required' ]}, 
    rating  : {type: Number, min: [0, 'rating must be positive'],max:5}

})

user= mongoose.model("User", User)
recipe= mongoose.model("Recipe", Recipe)
module.exports =  { user , recipe}
