var raml = require('./lib/raml.js');
var file = require('./lib/file.js');
var fs = require('fs');
var utils = require('utils')._;
var argv = require('minimist')(process.argv.slice(2));

var ramlParser = new raml(argv.t);

var resources = ramlParser.routes();

utils.each(resources, function(route){
	var text = '',
	tab = "\t",
	methods = ramlParser.methods(route),
	routes = [];

	console.log('Generating:', route);

	var script = new file();

	script.directory = argv.d;
	script.setName(route);

	utils.each(methods, function(method){
		t = '';
		t += 'app.' + method + "('/" + route + "', function($){\n";
		t += tab + "//your code here\n";
		t += "});";

		routes.push(t);
	});

	script.addContent(routes.join("\n\n"));

	script.build();
});