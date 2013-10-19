var fs = require("fs");
var gpio = require("pi-gpio");
var _ = require("underscore");

console.log("getting config");

var config = JSON.parse(fs.readFileSync("./config.json"));

var element;

var $$=function(el){

	decode_element = function(el){
		var splitter = /(?=\.|#|\[|\.|[a-zA-Z0-9]+;)/gi
		var el_array = el.split(splitter);
		console.log(el_array);
		var el_obj = {attr:[]};
		console.log(el.split(splitter));
		//build an object of the element
		for(i in el_array){
			var in_el=el_array[i];
			console.log(in_el);
			var split_in_el = in_el.split(/(#|\.|\[)/);
			console.log(split_in_el);
			if(split_in_el.length>1){
				if(split_in_el[0]==='['){
					console.log(in_el);
					el_obj.attr.push(split_in_el[0]);
				}
			} else {
				el_obj['element']=in_el;
			}
		}
		
		return el_obj;
	},
	getElement=function(el){
		
		var el_obj = this.decode_element(el);
		console.log(el_obj);
		for(i in config){
			if(config[i].type==el_obj.element){
				element=config[i];
			console.log(element.pin);
			return element;
			}
		}
	},
	open = function(){
		gpio.read(element.pin,function(err,val){
			if(err) console.log(err);
			console.log(val);	
		});
			gpio.open(element.pin,"output",function(err){
				console.log(err);
			});
	//	}
	},
	on = function(){
		
		gpio.open(element.pin,"output",function(err){	
			this.getVal();
			gpio.write(element.pin,1,function(err){
				console.log('should be on now');
				gpio.close(element.pin);
			});
		});
	
	},
	off = function(){
		gpio.open(element.pin,"output",function(err){
			gpio.write(element.pin,0,function(err){
				this.getVal();
				console.log('should be off now');
				gpio.close(element.pin);
			});
		});
	},
	getVal = function(){
		return gpio.read(element.pin,function(err,value){
			if(err) console.log(err);
			val = value
			console.log('in read '+value);
			return value;
		});
	}

	var el = el;
        el = this.getElement(el);
        console.log(el);
	return this;
}

module.exports=$$;