var express = require('express');

var router = express.Router();
const { body,validationResult,  sanitizeBody, check } = require('express-validator');
const validation = require('../controllers/validation')
const register  = require('../controllers/registration')
const responses_help = require('../helper/responses')
home = router.get('/', (req, res, next) => {
  res.render('home', {layout: 'default', template: 'home-template'});
})

signup = router.post('/signup', validation, (req, res, next) => {
  // validate the form
   const errors = validationResult(req)

 
   if(!errors.isEmpty()){
      /// if there is an error tell the client
     
     return res.status(422).json({errors : errors.array()})
   }

   // create a user
   new_user =  register.create_user(req.body.username,
            req.body.email,
            req.body.password, responses_help.already_existing_user,res)  


  // user created successfuly tell the client
    return res.status(200).json({url : `/profile?username=${req.body.username}`})
})

profiles = router.get('/profile', (req, res, next) => {

  res.render('profile', {layout: 'default', template: 'profile-template'});
})
about = router.get('/about', (req, res, next) => {
    res.render('about', {layout: 'default', template: 'about-template'});
  })


module.exports = {home, about}
