let models = require('../models/models')
let hash = require('../helper/hashing')
create_user = (username,  email, password)=>{
    password =  hash(password)
    new_user  = new  models({username : username, email: email, password:password})
    new_user.save((err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("new user saved to the database")
    }

    })
}

login_user =  (username, password)=>{
    password = hash(password)

    return models.find( u=>{
        return u.username === username && u.password === password
    })
}



module.exports = create_user