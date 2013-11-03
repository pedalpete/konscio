var $$=require("../module/module.js");

describe("initializing connection",function(){
	it("should get the config file", function(){
		var connection =  new $$.Connect();
		expect(connection.config.name).toEqual("tri-color_led");
	});
});

describe("request connection", function(){
	it("should send a request to connect", function(){
		var connection = new $$.Connect().send_connection();

	
	});
});
