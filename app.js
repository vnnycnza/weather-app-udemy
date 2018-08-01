const yargs = require('yargs');
const geocode = require('./apis');

const argv = yargs
	.options({
		t: {
			demand: true,
			alias: 'type',
			describe: 'Approach to use: callback or promises',
			string: true
		},
		a: {
			demand: true,
			alias: 'address',
			describe: 'Address to fetch weather for',
			string: true
		},
	})
	.help()
	.alias('help', 'h')
	.argv;

if (argv.type === 'callback') {
	geocode.geocodeAddress(argv.address, (err, location) => {
		if (err) console.log(err);
		else {
			console.log(`Location: ${location.address}`);
			geocode.getWeather(location.latitude, location.longitude, (err, res) => {
				console.log(`Current Weather: ${res.currently.summary}`);
				console.log(`Temperature is ${res.currently.temperature} Degree Celsius but it feels like ${res.currently.apparentTemperature} Degree Celsius`);
				console.log(`Hourly Report: ${res.hourly.summary}`);
				console.log(`Daily Report: ${res.daily.summary}`);
			});
		}
	});
} else if (argv.type === 'promises') {
	geocode.PgeocodeAddress(argv.address)
	.then((location) => {
		console.log('Address is:', location.address);
		return geocode.PgetWeather(location.latitude, location.longitude);
	})
	.then((weather) => {
		console.log(`Current Weather: ${weather.currently.summary}`);
		console.log(`Temperature is ${weather.currently.temperature} Degree Celsius but it feels like ${weather.currently.apparentTemperature} Degree Celsius`);
		console.log(`Hourly Report: ${weather.hourly.summary}`);
		console.log(`Daily Report: ${weather.daily.summary}`);
	})
	.catch((e) => {
		console.log(e);
	});
} else console.log('Invalid type');

