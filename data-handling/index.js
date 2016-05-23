var overpass = require('query-overpass'),
    fs = require('fs'),
    csv = require('ya-csv');

var countries = [], c = 18, r = 0, buffer = {lat:0.03, lng:0.09}, rfolder = ["highway","building"];

var reader = csv.createCsvFileReader('../data/countries.csv', { columnsFromHeader: true });
reader.addListener('data', function(data) {
	countries.push(data);
});

reader.addListener('end', function() {
	buildQuery();
});

function buildQuery(){

	countries[c].longitude = parseFloat(countries[c].longitude);
	countries[c].latitude = parseFloat(countries[c].latitude);

	var bbox = '('+
		(countries[c].latitude -buffer.lat/2)+','+
		(countries[c].longitude-buffer.lng/2)+','+
		(countries[c].latitude +buffer.lat/2)+','+
		(countries[c].longitude+buffer.lng/2)+')';

	var query = '[out:json];(';
	if(r === 0){
		query += 'way["highway"]'+bbox+';>;';
	}else{
		query += 'way["building"]'+bbox+';>;';
	}
	query += ');out;';

	overpass(query, function(err, data){
		if(err){
			console.log(query);
			console.log(err);
			if(err.statusCode === 429){
				buildQuery();
			}
		}else{
			var outputFilename = "../data/"+rfolder[r]+"/"+countries[c].cca3+".min.geojson";
			fs.writeFile(outputFilename, JSON.stringify(data), function(err) {
				console.log("done:",countries[c].name,r);
				nextQuery();
			});
		}
	});
}

function nextQuery(){
	r++;
	if(r>1){
		r = 0;
		c++;
		if(c>=countries.length){
			process.exit();
		}else{
			buildQuery();
		}
	}else{
		buildQuery();
	}
}