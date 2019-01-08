const port = process.env.PORT || 3000
var express = require('express');
var app = express();
var path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
// var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

app.engine('hbs', exphbs({
    defaultLayout: "main",
    extname: ".hbs",
    helpers: require("handlebars-helpers")(),
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
}));
app.set('view engine', 'hbs');
// app.use(logger('dev')); unsure what this line does.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.listen(port, () =>{
    console.log(`Server is listening on ${port}`);
});

module.exports = { app };
