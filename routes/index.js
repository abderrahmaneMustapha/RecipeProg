var express = require('express');

var router = express.Router();
const { body,validationResult,  sanitizeBody } = require('express-validator');
const validation = require('../controllers/validation')
const register  = require('../controllers/registration')

home = router.get('/', (req, res, next) => {
  res.render('home', {layout: 'default', template: 'home-template'});
})

signup = router.post('/signup', validation, (req, res, next) => {
   const errors = validationResult(req)
   if(!errors.isEmpty()){
     
     return res.status(422).json({errors : errors.array()})
   }

   // create a user
   register(req.body.username,
            req.body.email,
            req.body.password,)
    req.user  = req.body.username
    console.log(req.user)
  // user created successfuly tell the client
  return res.status(200).json({url : `/profile?username=${req.body.username}`})


})

profiles = router.get('/profile', (req, res, next) => {
  console.log("username in the profile ", res.user)
  res.render('profile', {layout: 'default', template: 'profile-template'});
})
about = router.get('/about', (req, res, next) => {
    res.render('about', {layout: 'default', template: 'about-template'});
  })


module.exports = {home, about}
