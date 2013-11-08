var fs = require("fs");
var config = JSON.parse(fs.readFileSync("./config.json"));
var socket = require('socket.io-client');
var io = socket.connect('http://dev.konscio:3000', {reconnect: true});
function Connect(){
		var that=this;
		io.emit('config',{config:config});
		io.on('ready', function(data){
			that.returned_config=data;
		});
	
};

module.exports=Connect;