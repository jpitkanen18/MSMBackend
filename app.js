const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const miro = require('./components/miroMethods');
require('./components/parseSpeech');

var indexRouter = require('./routes/index');
var speechRouter = require('./routes/speech');
var newboardRouter = require('./routes/newboard')
var boardsRouter = require('./routes/boards')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/speech', speechRouter);
app.use('/newboard', newboardRouter);
app.use('/boards', boardsRouter);

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

/*
*/


function flushBoardItems(){
  const boardid = "o9J_lhs4F_M=";
  miro.getItemsOnBoard(boardid).then(items =>{
    console.log(items.data);
    items.data.forEach(item => {
      miro.deleteItem(boardid, item.id);
    });
  }).catch(err =>{
    console.log(err)
  })
}

function flushBoards(){
  miro.listBoardsAsTeam().then(items =>{
    items.data.forEach(item => {
      miro.deleteBoard(item.id).then(res=>console.log(res));
    })
    miro.createBoard("Default", "Blank");
  }).catch(err =>{
    console.log(err)
  })
}

flushBoardItems()
//flushBoards()


module.exports = app;
