const express = require('express');
const mongoose = require('mongoose');
const exphbs  = require('express-handlebars');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const postRouter = require('./routes/posts_routes');
const pageRouter = require('./routes/page_routes');
const authRouter = require('./routes/auth_routes');
const port = process.env.port || 3000;

const app = express();

// express session stores session id as a cookie and reads the cookie on server side and stores data on server side
app.use(session({
  secret: 'secret key',
  resave: false,
  saveUninitialized: false,
  cookie: { expires: 600000 },
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))


// middleware that parses incoming data to json: bodyparser
// req.body can be accessed
app.use(express.json());
app.use(express.urlencoded({
extended:true
}));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const dbConn = 'mongodb://localhost/blog_app_auth'
// Set three properties to avoid deprecation warnings:
// useNewUrlParser: true
// useUnifiedTopology: true
// useFileAndModify: false
mongoose.connect(dbConn, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    },
    (err) => {
        if (err) {
            console.log('Error connecting to database', err);
        } else {
            console.log('Connected to database!');
        }
    });



// /posts/*
// homepage and dashboard routes / and /dashboard

app.use("/", pageRouter)
app.use('/posts', postRouter);
app.use("/user", authRouter)

app.listen(port, () => {
    console.log(`Blog express app listening on port ${port}`);
});