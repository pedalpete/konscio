var $$=require("./module/module.js");
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
		console.log("Temperature is "+$$("temperature").get()" degrees celsius");
		temperature_loop++;
	},1000);
}
console.log('done');


