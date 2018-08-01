# weather-app-udemy

Implementation of one of the exercises in The Complete Node.js Developer Course (2nd Edition) by Andrew Mead.
Shows concept of Callbacks & Promises

## Tech Stack
- Node.js v8+
- Yargs
- Request
- Axios
- Google API
- Dark Sky API

## What is it
The script takes two arguments, type and address. Type is either callback or promises, while address is the address you want to get weather information of.

## How to run
1. npm install
2. ```GOOGLE=<your_google_api_key> DARK_SKY=<your_darksky_api_key> node app.js -t <callback/promises> -a <address>```


