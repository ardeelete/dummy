var express = require('express');
var app = express();

var routes = require('./routes.js');
app.set('view engine', 'ejs');

//both index.js and routes.js should be in same directory
app.use('/routes', routes);

app.get('/', function(req, res){
    res.render('enroll');
});
app.get('/enroll', function(req, res){
    res.render('enroll');
 });

 //MIDDLEWARES
 app.use(function(req, res, next){
    console.log("Start");
    next();
 });
 
 //Route handler
 app.get('/middle', function(req, res, next){
    res.send("Middle");
    console.log('Middle');
    next();
 });
 
 app.use('/middle', function(req, res){
    console.log('End');
 });


 app.get('/:id', function(req, res){
    res.send('The id you specified is ' + req.params.id);
 });

 //pattern matched routes
 app.get('/things/:id([0-9]{5})', function(req, res){
    res.send('id: ' + req.params.id);
 });

 //Other routes here
app.get('*', function(req, res){
    res.send('Sorry, this is an invalid URL.');
 });




app.listen(80);