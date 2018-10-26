var SerialPort = require('serialport');
const fs = require('fs');
var fp_id = "";
var port = new SerialPort("COM4", {
    baudRate: 9600
});


var express = require('express'),
app = express(),
server = require('http').createServer(app),
io = require('socket.io').listen(server);

var routes = require('./routes.js');
app.set('view engine', 'ejs');
app.set('views', './views');


//both index.js and routes.js should be in same directory
app.use('/routes', routes);

app.get('/', function(req, res){
   res.render("enroll");
});


 //Other routes here
app.get('*', function(req, res){
    res.send('Sorry, this is an invalid URL.');
 });




 server.listen(80);


port.on('error', function(err) {
    console.log('Error: ', err.message);
  })
  
// Switches the port into "flowing mode"
port.on('data', function (data) {
      fp_id = fp_id+data;
      
  
      if(data.indexOf('\n') >= 0){
        console.log("Serial Data Received.");
        fp_id = fp_id.replace('\n','');
        fp_id = fp_id.replace('\r','');
        //if(data.chaAt(0)=='')
        //timeLog(data);
        //io.emit('some event', fp_id);
        io.sockets.emit('enroll_response', fp_id);
      }
  });
  
  
  function addZero(i) {
      if (i < 10) {
          i = "0" + i;
      }
      return i;
  }


  function timeLog(str){
        var d = new Date();
        datalog = fp_id.toString()+"&"+d.getTime();
        console.log("Data Received: ",datalog);

        var month= addZero(d.getMonth() + 1);
        var year = d.getFullYear();
        var day = addZero(d.getDate());
        var hour = addZero(d.getHours());
        var minute = addZero(d.getMinutes());
        var second = addZero(d.getSeconds());

        file_name = fp_id + "_" + month.toString() + day.toString() + year.toString() + hour.toString() + minute.toString() + second.toString();
       //console.log(file_name);
    
      fs.writeFile(file_name+".dat", datalog, (err) => {  
        if (err) throw err;
        console.log("Data writen: ", file_name+".dat");
    });
    
    //console.log(d.toUTCString());
    fp_id = "";

  }

  io.on('connection', function(socket) {
    console.log('New socket connected');
 
    //Whenever someone disconnects this piece of code executed
    socket.on('enroll_event', function (data) {
        console.log(data.name);
       console.log('Enroll event.');
       port.write("enroll");
    });
 });