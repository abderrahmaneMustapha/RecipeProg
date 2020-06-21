let models = require('../models/models')

create_user = (username,  email, password)=>{
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

module.exports = create_user