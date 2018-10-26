var express = require('express');
var app = express();

var routes = require('./routes.js');

//both index.js and routes.js should be in same directory
app.use('/routes', routes);

app.get('/', function(req, res){
   res.send("Hello world!");
});

app.get('/:id', function(req, res){
    res.send('The id you specified is ' + req.params.id);
 });

app.listen(80);