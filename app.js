var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session');
var FileStore = require('session-file-store')(session);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishRouter = require('./routes/dishRouter');
var leaderRouter = require('./routes/leaderRouter');
var promotionRouter = require('./routes/promotionRouter');
var uploadRouter = require('./routes/uploadRouter');
const favoriteRouter = require('./routes/favoriteRouter')
var commentRouter = require('./routes/commentRouter');

var config = require('./config');
var passport = require('passport');
var authenticate = require('./authenticate');


var app = express();

//redirecting incomming to secure if not
// app.all('*', (req,res,next) =>{
//   if(req.secure){
//     return next();
//   }
//   else{
//     res.redirect(307, 'https://' + req.hostname + ':'+ app.get('secPort') + req.url);
//   }
// });

// database connection building
const mongoose = require('mongoose');
const Dishes = require('./models/dishes'); //require dishes model of schema

//connection string 
// const url = 'mongodb://localhost:27017/conFusion'; 
//instead of local database we here connect to cloud mongodb which atlas
// const url = config.mongoUrl;
const dotenv =require('dotenv') ;
dotenv.config();
const url = process.env.MONGO_URL;

// mongoose.Promise = global.Promise;
const connect = mongoose.connect(url,{
   useNewUrlParser: true, useUnifiedTopology: true,
   
});   //getting connect


connect.then((db) => {    //handling responce after connection either success or failure
    console.log("Connected correctly to server");
    // console.log(db);
}, (err) => { console.log(err); });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser('12345-67890-09876-54321'));

// app.use(session({
//   name: 'session-id',
//   secret: '12345-67890-09876-54321',
//   saveUninitialized: false,
//   resave: false,
//   store: new FileStore()
// }));

app.use(passport.initialize());

// app.use(passport.session())

app.use('/', indexRouter);
app.use('/users', usersRouter);

//authentication

// function auth (req, res, next) {
//   console.log(req.user);

//   if (!req.user) {
//     var err = new Error('You are not authenticated!');
//     err.status = 403;
//     next(err);
//   }
//   else {
//         next();
//   }
// }
// app.use(auth);
app.use(express.static(path.join(__dirname, 'public')));


app.use('/dishes', dishRouter);
app.use('/leaders', leaderRouter);
app.use('/promotions', promotionRouter);
app.use('/imageUpload', uploadRouter);
app.use('/favorites',favoriteRouter);
app.use('/comments', commentRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
