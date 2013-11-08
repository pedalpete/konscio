var $$=require("../module/module.js");

describe("initializing connection",function(){
	it("should get the config file", function(){
		var connection =  new $$.Connect();
		waits(3000);

		runs(function(){
		console.log(connection);
		expect(connection.returned_config.name).toEqual("tri-color_led");
		});
	});
});

