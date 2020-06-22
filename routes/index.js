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
   const errors = validationResult(req)
   if(!errors.isEmpty()){
     return res.status(422).json({errors : errors.array()})
   }

   // create a user
   register(req.body.username,
            req.body.email,
            req.body.password,)
  // user created successfuly tell the client
  return res.redirect(`/profile/${req.body.username}`);
  res.setHeader('Content-type', 'application/json')
  res.status(200)
  res.json({'statu' : "user created successfuly"})

})
about = router.get('/about', (req, res, next) => {
    res.render('about', {layout: 'default', template: 'about-template'});
  })


module.exports = {home, about}
