const express  = require('express')
const path = require('path')
const hbs = require('express-handlebars')
const mongoose = require('mongoose')


const app = express()


// connect to the database
var uri = "mongodb://localhost:27017/recipe"
mongoose.connect(uri, { useNewUrlParser: true })
var db = mongoose.connection
// error
db.on('error', console.error.bind("connection error"))
db.on("open", ()=> {
  console.log("MongoDB database connection established successfully");
});

// middlewares and rooters
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
app.use(express.static(path.join(__dirname,'/public')))


// use logger
app.use(logger)

// use routes
app.use(routers.home)
app.use(routers.about)

// add models

const PORT = process.env.PORT || 8000
app.listen(PORT, ()=> console.log(`Server started at port ${PORT}`))
