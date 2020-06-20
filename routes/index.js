var express = require('express');
var router = express.Router();

home = router.get('/', (req, res, next) => {
  res.render('home', {layout: 'default', template: 'home-template'});
})
about = router.get('/about', (req, res, next) => {
    res.render('about', {layout: 'default', template: 'about-template'});
  })

module.exports = {home, about}
