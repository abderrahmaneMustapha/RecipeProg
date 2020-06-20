const express  = require('express')
const path = require('path')
const hbs = require('express-handlebars')
const app = express()

const logger = require('./helper/logger')
const routers = require('./routes/index')
// Handle bars middlware
app.engine( 'hbs', hbs( {
    extname: 'hbs',
    defaultView: 'default.hbs',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
  }))
app.set('view engine', 'hbs');

// init static file folder
app.use(express.static(path.join(__dirname,'public')))

// logger
app.use(logger)

// routes
app.use(routers.home)
app.use(routers.about)

const PORT = process.env.PORT || 8000
app.listen(PORT, ()=> console.log(`Server started at port ${PORT}`))
