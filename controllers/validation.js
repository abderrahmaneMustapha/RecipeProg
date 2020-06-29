
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

module.exports = {signup_validation, login_validation}