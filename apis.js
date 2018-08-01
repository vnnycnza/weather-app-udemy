/*
*	api.js
*	@vnnycnza
*	Udemy: the-complete-nodejs-developer-course-2
*	Weather App Exercise demonstrating async functions
*	Uses Google API and Dark Sky APIs, Callbacks vs Promises
*/

const request = require('request');
const axios = require('axios');
const DARK_SKY_KEY = process.env.DARK_SKY;
const GOOGLE_KEY = process.env.GOOGLE;

// -- Callback Method: call Google API to get address 
var geocodeAddress = (address, callback) => {
	if (!GOOGLE_KEY) return callback('No GOOGLE_KEY provided');

	var encodedAddress = encodeURIComponent(address);
	request({
		url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${GOOGLE_KEY}`,
		json: true
	}, (error, response, body) => {
		if (error) return callback('Unable to connect to Google servers.');
		if (body.status === 'ZERO_RESULTS') return callback('Unable to find the address.');
		return callback(null, {
			address: body.results[0].formatted_address,
			latitude: body.results[0].geometry.location.lat,
			longitude: body.results[0].geometry.location.lng
		});
	});
};

// -- Callback Method: call Dark Sky API to get temperature 
var getWeather = (lat, long, callback) => {
	if (!DARK_SKY_KEY) return callback('No DARK_SKY_KEY provided');

	request({
		url: `https://api.darksky.net/forecast/${DARK_SKY_KEY}/${lat},${long}?units=si`,
		json: true
	}, (error, response, body) => {
		if (!error && response.statusCode == 200) return callback(null, body);
		else return callback('Unable to retrieve weather information.');
	});
};

// -- Promises Method: call Google API to get address
var PgeocodeAddress = (address) => {
	var encodedAddress = encodeURIComponent(address);
	var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${GOOGLE_KEY}`;
	return new Promise((resolve, reject) => {
		if (!GOOGLE_KEY) reject('No GOOGLE_KEY provided');
		axios.get(url)
			.then((response) => {
				if (response.data.status === 'ZERO_RESULTS') {
					throw new Error('Unable to find the address');
				}
				resolve({ 
					address: response.data.results[0].formatted_address,
					latitude: response.data.results[0].geometry.location.lat,
					longitude: response.data.results[0].geometry.location.lng 
				});
			}).catch((err) => {
				reject(err);
			});
	});
};

// -- Promises Method: call Dark Sky API to get temperature
var PgetWeather = (lat, long) => {
	var url = `https://api.darksky.net/forecast/${DARK_SKY_KEY}/${lat},${long}?units=si`
	return new Promise((resolve, reject) => {
		if (!DARK_SKY_KEY) reject('No DARK_SKY_KEY provided');
		axios.get(url)
			.then((response) => {
				if (response.status !== 200) {
					throw new Error('Unable to retrieve weather info');
				}
				resolve(response.data);
			}).catch((err) => {
				reject(err);
			});
	});
};

module.exports = {
	geocodeAddress: geocodeAddress,
	getWeather: getWeather,
	PgeocodeAddress: PgeocodeAddress,
	PgetWeather: PgetWeather
};

