var express = require('express');

var router = express.Router();
const { body,validationResult,  sanitizeBody, check } = require('express-validator');
const validation = require('../controllers/validation')
const register  = require('../controllers/registration')
const responses_help = require('../helper/responses')
const csrf = require('csurf')
const csrfProtection = csrf({ cookie: true })
const bodyParser = require('body-parser')
const parseForm = bodyParser.urlencoded({ extended: false })

home = router.get('/', csrfProtection,(req, res, next) => {
  is_auth = req.session.user ? req.session.user.is_authenticated : false
  if (is_auth){
    return res.render('home', {layout: 'default', template: 'bg-black', is_authenticated : is_auth})
  }

  return res.render('signup', {layout: 'default', template: 'bg-black', csrfToken: req.csrfToken()});
})

signup = router.post('/signup',parseForm,csrfProtection, validation.signup_validation, (req, res, next) => {
  // validate the form
   const errors = validationResult(req)
  
   if(!errors.isEmpty()){
      /// if there is an error tell the client
     return res.status(422).json({errors : errors.array()})
   }
   // create a user
   new_user =  register.create_user(req.body.username,
            req.body.email,
            req.body.password, responses_help.already_existing_user,res,req
            ) 
   
})

login = router.post('/login',parseForm,csrfProtection,validation.login_validation, (req,res,next)=>{
 login_user(req.body.usernameLogin, req.body.passwordLogin, res,req)
})

signout = router.get('/logout', (req,res,next)=>{
  console.log("user login out...")
  req.session.user.is_authenticated = false
  res.redirect('/');
})

profile = router.get('/profile',csrfProtection, (req, res, next) => {
  is_your_profile = true
  template  = "othersprofile-template"
  view = "others-profile"
  if(req.query.username == req.session.user.username && req.session.user.is_authenticated){
   is_your_profile = true
   template  = "userprofile-template"
   view = "user-profile"
  }
 
  res.render(view, {layout: 'default',csrfToken: req.csrfToken(), template: template, is_authenticated : req.session.user.is_authenticated});
})

about = router.get('/about', (req, res, next) => {
    res.render('about', {layout: 'default', template: 'about-template', is_authenticated : req.session.user.is_authenticated});
})

add_recipe =router.post("/recipe/add",parseForm,csrfProtection,validation.add_recipe_validation,(req, res, next)=>{
   // validate the form
   const errors = validationResult(req)
  
   if(!errors.isEmpty()){
      /// if there is an error tell the client
      console.log(errors)
     return res.status(422).json({errors : errors.array()})
   }
})

module.exports = {home, about,profile, signout,add_recipe}
