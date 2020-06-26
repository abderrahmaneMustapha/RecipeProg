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

login_user =  (username, password)=>{
    password = hash(password)
    
     models.findOne({username : username }, (err, user) =>{
        if(user.password === password){
            console.log("login")
        }
        else{
            console.log('wrong password')
            console.log("your password is", password)
            console.log("the real password is",user.password)
            console.log("the user name is ", username)
        }
    })
}



module.exports = {create_user, login_user}