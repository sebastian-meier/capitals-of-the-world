var fs = require('fs'),
	countries = require('./countries.json');

console.log(countries);

var csv = "city,country,cca3\n";

for(var c = 0; c<countries.length; c++){
	csv += countries[c].capital+","+countries[c].name.common+","+countries[c].cca3+"\n";
}

fs.writeFile("countries.csv", csv, function(err) {
	console.log("done");
	process.exit();
});