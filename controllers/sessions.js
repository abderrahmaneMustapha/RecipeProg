const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);


sessions = ( mongoose_connection)=>{
    store = new MongoDBStore({
        mongooseConnection: mongoose_connection
    })
    
    store.on('error', (error)=>{
        console.error(error)
    })
    
    return express_session = require('express-session')({
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
}




module.exports = sessions