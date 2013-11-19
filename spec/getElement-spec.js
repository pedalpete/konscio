var $$=require("../module/module.js");
$$.Env('dev'); // setup for testing
var fs = require("fs");

describe("decode element", function(){
	it("should return the second object in the config",function(){
		var pin_obj = new $$.Konscio("led[color:green]").decode_element();
		expect(pin_obj.type).toBe('led');
		expect(pin_obj.color).toBe('green');
	});
});


describe("get element number", function(){
	it("should return the pin number of the red pin", function(){
		var pin_obj = new $$.Konscio("led[color:red]").get_element();
		expect(pin_obj.pin).toBe(16);
	})
});

describe("remove items from array", function(){
	it("should return array with only two items",function(){
		var item_list =new $$.Konscio("led[color:red]").remove_items([1,2,3,4],[1,2]);
		expect(item_list.length).toBe(2);
		expect(item_list[0]).toBe(3);

	});
});

describe("compare nodes to find matches",function(){
	it("should return true if nodes match",function(){
		var node_match = new $$.Konscio("led[color:red]").compare_node({a:1,b:6,c:2,d:5},{a:1,c:2,d:5});
		expect(node_match).toBe(true);
	});

	it("should return false if nodes don't match on values",function(){
		var node_match2 = new $$.Konscio("led[color:red]").compare_node({a:1,b:23,c:3},{a:1,b:2,c:3});
		expect(node_match2).toBe(false);
	});

	it("should return false config node does not have attribute",function(){
		var node_match2 = new $$.Konscio("led[color:red]").compare_node({a:1,b:2,c:3},{a:1,b:2,c:3, d:5});
		expect(node_match2).toBe(false);
	});
});

describe("Get Temperature", function(){
	it("should format a number into a temperature",function(){
		var get_element = new $$.Konscio("temperature");
		expect(parseFloat(get_element.format_temperature(31200))).toEqual(31.20);
	})
})
