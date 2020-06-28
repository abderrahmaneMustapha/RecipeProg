let models = require('../models/models')
let hash = require('../helper/hashing')
create_user  = (username,  email, password, fn,res,req)=>{
    
    models.exists({username:username}).then(( exists)=>{
        if (!exists){
            new_user  = new  models({username : username, email: email, password:hash(password)})
            
            new_user.save((err)=>{
                if(err){
                    return false
                }
                else{   
                    req.session.user = {
                        username : req.body.username,
                        email : req.body.email,
                        is_authenticated : true
                    } 
                    return res.status(200).json({url : `/profile?username=${req.body.username}`})
                }
            }) 
        }else{
            return fn( [{value: username,
            msg: 'username already exists',
            param: 'username',
            location: 'body'}] , res)
        }
          
     })
   
}

login_user =  (username, password,res,req)=>{
    password = hash(password)
    
    
    models.findOne({username : username }, (err, user) =>{
        if(user.password === password){
            req.session.user = {
                username : req.body.username,
                email : req.body.email,
                is_authenticated : true
            } 
            return res.status(200).json({url : `/profile?username=${req.body.username}`})
        }
        else{
            
            return res.status(422).json({errors : [
                {value: password,
                msg: 'wrong password or username',
                param: 'passwordLogin',
                location: 'body'},            
                {value: username,
                msg: 'wrong password or username',
                param: 'usernameLogin',
                location: 'body'}]})
        }
    })
}



module.exports = {create_user, login_user}