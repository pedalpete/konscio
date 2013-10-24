var fs = require("fs");
var gpio = require("pi-gpio");
var _ = require("underscore");

console.log("getting config");

var config = JSON.parse(fs.readFileSync("./config.json"));


var $$=function(el){
	var new_el = new Konscio(el);
	return new_el;
}

function Konscio(el){
	this.el = el;
	this.element;
	that = this;
	return this.init();
}
Konscio.prototype = {
	init: function(){
		this.element = this.get_element(this.el);
	},
	decode_element : function(){
		var splitter = /(?=\.|#|\[|\.|[a-zA-Z0-9]+;)/gi
		var el_array = this.el.split(splitter);
		var el_obj = {type: el_array[0]};

		//build an object of the element

		for(i in el_array){
			var in_el=el_array[i];
			var split_in_el = in_el.split(/(#|\.|\[)/).filter(Boolean);
			if(split_in_el.length>1){
				if(split_in_el[0]==='['){
					//clean up 
					var split_clean=split_in_el[1].replace(']','').split(':');
					el_obj[split_clean[0]]=split_clean[1];
				}
			}
		}
		
		return el_obj;
	},
	
	get_element: function(){
		var el_obj = this.decode_element(this.el);
		var elements_array=[]
		for(var i in config){
			elements_array.push(this.compare_node(config[i],el_obj));
	}
	this.element=elements_array;
	return this.best_match(elements_array);
},

best_match : function(elements_array){
		return config[elements_array.indexOf(true)];
	},
remove_items : function(array,remove){
		for(var i in remove){
			array.splice(array.indexOf(remove[i]),1); // remove a list of items from an array
		}
		return array;
	},
compare_node : function(config_item,el_obj){
		var obj_keys=Object.keys(el_obj);
		for(var k in obj_keys){
			if(config_item[obj_keys[k]]!=el_obj[obj_keys[k]]){
				return false;
			}
		}
		return true;
	},
open : function(){
		gpio.read(element.pin,function(err,val){
			if(err) console.log(err);
			console.log(val);	
		});
			gpio.open(element.pin,"output",function(err){
				console.log(err);
			});
	//	}
	},
	on : function(){
		console.log(that.element.pin);
		
		gpio.open(that.element.pin,"output",function(err){	
			gpio.write(that.element.pin,1,function(err){
				console.log('should be on now');
				gpio.close(that.element.pin);
			});
		});
	
	},
	off : function(){
		gpio.open(element.pin,"output",function(err){
			gpio.write(element.pin,0,function(err){
				this.getVal();
				console.log('should be off now');
				gpio.close(element.pin);
			});
		});
	},
	get : function(){
		return gpio.read(element.pin,function(err,value){
			if(err) console.log(err);
			val = value
			console.log('in read '+value);
			return value;
		});
	}
}



module.exports=$$;