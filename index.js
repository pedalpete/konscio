var $$=require("./module/module.js");
var connection =  new $$.Connect();
var get_element = $$("led[color:blue]");
console.log(get_element);
get_element.on();
setTimeout(function(){
	get_element.off();
},3000);

setTimeout(function(){
	$$("led[color:red]").on();
},4000);

setTimeout(function(){
	$$("led[color:green]").on();
	console.log('finished');
},6000);


var temperature_loop = 0;
while(temperature_loop<10){
	setTimeout(function(){
		var temperature = $$('temperature').get();
		console.log("Temperature is "+temperature+" degrees celsius");
		temperature_loop++;
	},1000);
}
console.log('done');


