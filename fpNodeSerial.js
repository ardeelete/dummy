// Require the serialport node module
var SerialPort = require('serialport');
const fs = require('fs');
var fp_id = "";
var port = new SerialPort("COM4", {
    baudRate: 9600
});
 
// Open errors will be emitted as an error event
port.on('error', function(err) {
  console.log('Error: ', err.message);
})

// Switches the port into "flowing mode"
port.on('data', function (data) {
	fp_id = fp_id+data;
	//console.log(str);

	if(data.indexOf('\n') >= 0){
		var d = new Date();

		fp_id = fp_id.replace('\n','');
		fp_id = fp_id.replace('\r','');

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
});


function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
 
