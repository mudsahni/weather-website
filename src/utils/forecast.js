const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const api = "https://api.darksky.net";
    const path = "forecast/";
    const secret = "9d8d6c05a4f3d20166b96615899aa82c";
    const url = `${api}/${path}${secret}/${longitude},${latitude}?units=si`;

    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback(`Unable to connect to weather services. Error: ${error}`, undefined);
        } else if (body.error) {
            callback(`Unable to find location. Try another search. Error: ${body.error}`, undefined);
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out with a high of ' + body.daily.data[0].temperatureHigh + 'and a low of ' + body.daily.data[0].temperatureLow + '. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    });

};


module.exports = forecast;