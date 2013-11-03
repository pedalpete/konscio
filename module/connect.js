var fs = require("fs");
var config = JSON.parse(fs.readFileSync("./config.json"));
var ext_request = require("request");

function Connect(){
	this.config = config;
	this.send_connection = function(){
		var url='http://dev.konscio:3000/connections';
		ext_request.post(url,{form:this.config}, function(err,resp,body){
		 res.type('json');
		if(err){
			console.log('error');
			return res.jsonp({error: "dang! There was a probem getting the wikipedia page. Is it possible wikipedia doesn't know what "+req.params.query+" is?"});
		} else {
			return true;
		}
	});
		
	}
	
}

module.exports=Connect;