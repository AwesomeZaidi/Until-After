require('dotenv').config();
const express = require('express');
const path = require('path');
// express-validator is a wrapper around validator.js that validates and sanitizes string inputs. In production, your users will try to type in all kinds of nonsense into your forms --- even things your site wasn't intended to deal with! express-validator plugs into the Express.js ecosystem and helps keep you and your code safe.
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser'); //this basically allows us to get the request body from each well, request.
const logger = require('morgan');
const jwt = require('jsonwebtoken');
const methodOverride = require('method-override');
const expressFileupload = require('express-fileupload');
const schedule = require('node-schedule');
//Initialize a REST client in a single line:

const app = express();
// Use Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
// Add after body parser initialization!
app.use(expressValidator());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
const exphbs = require('express-handlebars');

app.engine('hbs', exphbs({
  defaultLayout: "main",
  extname: ".hbs",
  helpers: {
    dotdotdot: function(str) {
      if (str.length > 10) {
        return str.substring(0,35) + '...';
      }
      return str;
    }
  }
}));
app.set('view engine', 'hbs');

// database connection
require('./data/until-after-db');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '../public'));
app.use(methodOverride('_method'));
app.use(expressFileupload({}));

// require routers (mountable route handlers. This instead of passing in the whole app to each module.)
const checkAuth = require('./middleware/checkAuth');
// const sendText = require('./middleware/sendText');
const journalRouter = require('./routes/journal');
const usersRouter = require('./routes/users');
const settingsRouter = require('./routes/settings');
const requestRouter = require('./routes/request');
// const twilio = require('./routes/twilio');

// when a user creates a journal, we get that createdAt time and in that controller we call a function
// to schedule the dots creations. 

  // The function will run every 7 days
  // hour (0-23)
  // date (1-31)
  // month (0-11)
  // year
  // dayOfWeek (0-6) Starting with Sunday

  // this function will check when it's being created, based on that it'll run one of the jobs.


//   var j = schedule.scheduleJob({ start: startTime, end: endTime, rule: '*/1 * * * * *' }, function(){
//     console.log('Time for tea!');
//   });

// const j = schedule.scheduleJob('60 * * * *', function(){
//   console.log('The answer to life, the universe, and everything!');
// });

// specific custom auth checking middleware.

// app.use(checkAuth);
app.use('/', checkAuth);
// app.use('/login', sendText);

app.use('/', journalRouter);
app.use('/', usersRouter);
app.use('/', settingsRouter);
app.use('/', requestRouter);
// app.use('/', twilio);

// error handler - later.
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


// for heroku
const port = process.env.PORT || 3000;
app.listen(port);

module.exports = app;
