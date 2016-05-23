var fs = require('fs'),
    csv = require('ya-csv');

var countries = [], c = 18, r = 0, buffer = {lat:0.03, lng:0.09}, rfolder = ["highway","building"];

var reader = csv.createCsvFileReader('../data/countries.csv', { columnsFromHeader: true });
reader.addListener('data', function(data) {
	countries.push(data);
});

reader.addListener('end', function() {
	shorten();
});

function shorten(){

	csv = "city,country,code,lat,lng\n";

	for(var i = 0; i<countries.length; i++){
		csv += countries[i].city+","+countries[i].country+","+countries[i].cca3+","+parseFloat(countries[i].latitude).toFixed(3)+","+parseFloat(countries[i].longitude).toFixed(3)+"\n";
	}
	
	fs.writeFile("../data/countries_short.csv", csv, function(err) {
		console.log("done");
		process.exit();
	});
}