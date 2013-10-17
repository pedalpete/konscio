var fs = require("fs");
var gpio = require("pi-gpio");

console.log("getting config");

var config = JSON.parse(fs.readFileSync("./config.json"));
console.log(config);
var element;

var $$=function(el){

	getElement=function(el){
		console.log(el);
		for(i in config){
			if(config[i].type==el){
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