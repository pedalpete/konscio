var fs = require("fs");
var config = JSON.parse(fs.readFileSync("./config.json"));
var gpio = require("pi-gpio");
var _ = require("underscore");
var Konscio = require("./get_elements.js");
var Connect = require("./connect.js");


var $$=function(el,config){
	var new_el = new Konscio(el);
	return new_el;
}



function Env(environment){
	console.log('Environment='+environment);
	if(environment==='dev' || environment==='test'){
		module.exports.Konscio = Konscio;
		module.exports.Connect = Connect;

	}
}



module.exports=$$;
module.exports.Env = Env;

