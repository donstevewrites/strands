require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var exphbs  = require('express-handlebars');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const passport = require('passport');
const helmet = require('helmet');
const csurf = require('csurf')

//import routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');

var app = express();

//express handlebars setup

const hbs = exphbs.create({
  extname: '.hbs',
  defaultLayout: path.join(__dirname, 'views/layouts/main'),
  partialsDir: path.join(__dirname, 'views/partials'),
  helpers: {
      isMatched: function(a,b){
          if (a !== undefined && b !== undefined) {
            // statement
             return a.toString() === b.toString();
          }
          
          return false;
      },
      cartLengthDisplay: function (cartItem) {
        if (cartItem > 0) {
          return cartItem;
        }
        return 0;
      }
  }
})

// view engine setup
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//file upload middleware

app.use(fileUpload());

//session setup
const storeSession = new MongoDBStore({
  uri: process.env.DB_URL,
  collection: 'session'
});

app.use(session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: true,
  store: storeSession,
  cookie: { maxAge: 3600000 * 24 * 7}
}));

app.use(csurf());

app.use(flash());

//middlewares before routes
app.use((req, res, next) => {
  res.locals.user = req.user ? req.user : '' ;
  res.locals.cart = req.session.cart !== undefined ? req.session.cart : null;
  res.locals.error = req.flash('error'),
  res.locals.success = req.flash('success'),
  res.locals.strandAdmin = '/strand/admin',
  //res.locals.failure = req.flash('failure'),
  res.locals.csrfToken = req.csrfToken();
  //console.log(req.csrfToken());
  //console.log(req.user);
  // console.log(req.originalUrl);
  console.log(req.session)
  next();
});



//routes

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/strand/admin', adminRouter);

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

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('mongodb connected ...');
  
}).catch(err => console.log(err));

app.listen(process.env.PORT, console.log('app is running on port 3000'));