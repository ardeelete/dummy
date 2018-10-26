var SerialPort = require('serialport');
var port = new SerialPort("COM4", {
    baudRate: 9600
});
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


str = "";
 
// Open errors will be emitted as an error event
port.on('error', function(err) {
  console.log('Error: ', err.message);
})

port.on('data', function (data) {
	str = str+data;
	//console.log(str);

	if(data.indexOf('\n') >= 0){
		str = str.replace('\n','');
		str = str.replace('\r','');
		console.log('\n');
		console.log('Data Received: ', str);
		str = "";
	}
})

rl.question('Send: ', (answer) => {
	console.log("Data Sent: ", answer);
  	port.write(answer);
});