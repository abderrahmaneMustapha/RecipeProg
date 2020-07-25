
const { body, validationResult  } = require('express-validator');
signup_validation = [
    body('username').isLength({min:5, max : 25}),
    body('email').isEmail(),
    body('password').isLength({ min: 8, max:100 })
    ]

login_validation = [
    body('username').isLength({min:5, max : 25}),
    body('password').isLength({ min: 8, max:100 })
    ]

add_recipe_validation = [
    body('name').isLength({min:5, max:50}),
    body('notes').isLength({min:0, max:1500})
]

module.exports = {signup_validation, login_validation,add_recipe_validation}