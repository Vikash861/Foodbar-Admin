require('dotenv').config()
const express = require('express')
const cors = require('cors');
const flash = require('express-flash');
const MongoStore = require('connect-mongo')
const router = require('./routes/index')
const path = require('path')
const mongoose = require('mongoose');
const passport = require('passport')
const session = require('express-session')


const connectMongoose = require('./config/database');
const app = express()

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('uploads'));

// database configuration
connectMongoose();


// session
const mongoUrl = process.env.DB_URL
const secret = process.env.SESSION_SECRET

app.use(session({
    secret,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl,
        mongooseConnection: mongoose.connection
    }),
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000 // 1 week
    },

}));
app.use(flash());


// passport config
const passportInit = require('./config/passport');
passportInit(passport)
app.use(passport.initialize());
app.use(passport.session());

// middleware
app.use(cors({ origin: 'https://foodbar-app.netlify.app' }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }));





app.use(router)





const port = process.env.PORT || 5000
app.listen(port, error => {
    if (error) throw error
    console.log('server listening on port : ' + port)
})

