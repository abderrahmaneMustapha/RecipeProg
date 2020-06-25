const express  = require('express')
const path = require('path')
const hbs = require('express-handlebars')
const mongoose = require('mongoose')
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const app = express()


// connect to the database
var uri = "mongodb://localhost:27017/recipe"
mongoose.connect(uri, { useNewUrlParser: true , useUnifiedTopology: true })
var db = mongoose.connection
// error
db.on('error', console.error.bind("connection error"))
db.on("open", ()=> {
  console.log("MongoDB database connection established successfully");
});

// middlewares and rooters
const logger = require('./helper/logger')
const routers = require('./routes/index')
const  sessions  = require('./controllers/sessions')

// Handle bars middlware
app.engine( 'hbs', hbs( {
    extname: 'hbs',
    defaultView: 'default.hbs',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
  }))
app.set('view engine', 'hbs');

// init static file folder
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname,'/public')))


// use logger
app.use(logger)

// sessions
store = new MongoDBStore({
  uri : uri,
  collection : 'recipeProgSessions'
})

store.on('error', (error)=>{
  console.error(error)
})

rexpress_session = require('express-session')({
  secret: 'keyboard cat',
  credentials: 'include',
  cookie: {
  maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  },
  store: store,
  // Boilerplate options, see:
  // * https://www.npmjs.com/package/express-session#resave
  // * https://www.npmjs.com/package/express-session#saveuninitialized
  resave: true,
  saveUninitialized: true
})
app.use(rexpress_session)
// sessions setup end

// use routes

app.use(routers.home)
app.use(routers.about)
app.use(routers.profile)

const PORT = process.env.PORT || 8000
app.listen(PORT, ()=> console.log(`Server started at port ${PORT}`))
