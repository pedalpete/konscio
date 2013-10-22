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
	getElement=function(el){
		
		var el_obj = this.decode_element(el);
		var elements_array=[]
		for(i in config){
			if(config[i].type===el_obj.type){
				elements_array.push(10);
				var config_keys = Object.keys(config[i]);
				config_keys=this.remove_items(config_keys,['pin','type']); //remove pin and type from measurements
				console.log(config_keys);
					for(k in config_keys){
					console.log(config[i][config_keys[k]]+'=='+el_obj[config_keys[k]]);
					
					if(el_obj[config_keys[k]] && this.compare_node(config[i][config_keys[k]],el_obj[config_keys[k]])){
							elements_array[i]+=5;
					} 
				
				}
			} else {
				elements_array.push(0);
			}
		}
		console.log(elements_array);
		return best_match(elements_array);
	},
	best_match = function(elements_array){
		return config[elements_array.indexOf(Math.max.apply(this,elements_array))];
	}
	remove_items= function(array,remove){
		for(var i in remove){
			array.splice(array.indexOf(remove[i]),1); // remove a list of items from an array
		}
		return array;
	},
	compare_node= function(config_item,el_item){
		console.log(config_item+','+el_item);
		return config_item===el_item;
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