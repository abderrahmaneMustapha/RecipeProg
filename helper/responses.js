const { check } = require("express-validator");

already_existing_user = (errors, res)=>{
    
    return res.status(422).json({errors : errors})

}



module.exports = {already_existing_user,}