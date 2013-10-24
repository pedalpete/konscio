var $$=require("./module/module.js");
console.log("starting");
var get_element = $$("led[color:blue]");
console.log(get_element);
get_element.on();
//setTimeout(function(){
//	$$("led").off();
//},3000);

//setTimeout(function(){/
	//$$("led").on();
//},4000);

//setTimeout(function(){
	//$$("led").off();
//	console.log('finished');
//},6000);
console.log('done');


