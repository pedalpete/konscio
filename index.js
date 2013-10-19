var $$=require("./module/module.js");
console.log("starting");
$$("led.first#last[color:blue]").on();

setTimeout(function(){
	$$("led").off();
},3000);

setTimeout(function(){
	$$("led").on();
},4000);

setTimeout(function(){
	$$("led").off();
	console.log('finished');
},6000);
console.log('done');


