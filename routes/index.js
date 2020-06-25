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
            req.body.password, responses_help.already_existing_user,res,req) 
    req.session.user = {
      username : req.body.username,
      email : req.body.email
    }
})

profile = router.get('/profile', (req, res, next) => {
  is_your_profile = true
  template  = "othersprofile-template"
  view = "others-profile"
  if(req.query.username == req.session.user.username){
   is_your_profile = true
   template  = "userprofile-template"
   view = "user-profile"
  }
 
  res.render(view, {layout: 'default', template: template});
})
about = router.get('/about', (req, res, next) => {
    res.render('about', {layout: 'default', template: 'about-template'});
  })


module.exports = {home, about,profile}
