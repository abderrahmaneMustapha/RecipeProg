var express = require('express');
var router = express.Router();
const { body,validationResult,  sanitizeBody } = require('express-validator');
const validation = require('../controllers/validation')
const register  = require('../controllers/registration')

home = router.get('/', (req, res, next) => {
  res.render('home', {layout: 'default', template: 'home-template'});
})

home = router.post('/signup', validation, (req, res, next) => {
  console.log(req.body)
  //console.log(req.body.email)
  //console.log(req.body.password)
   const errors = validationResult(req)
   if(!errors.isEmpty()){
     return res.status(422).json({errors : errors.array()})
   }


   register(req.body.username,
            req.body.email,
            req.body.password,)
})
about = router.get('/about', (req, res, next) => {
    res.render('about', {layout: 'default', template: 'about-template'});
  })


module.exports = {home, about}
