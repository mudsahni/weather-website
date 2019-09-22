const request = require('request');

const geocode = (address, callback) => {
    const accessToken = "pk.eyJ1IjoibXVkaXRzYWhuaSIsImEiOiJjazByM3J6dGEwMjM2M2htcm0zMnRkdWowIn0.ie1xiORFiUbVC1h-sXbeNw"
    const api = "https://api.mapbox.com/geocoding/v5/mapbox.places"
    const url = api + "/" + encodeURIComponent(address) + ".json?access_token=" + accessToken;

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback(`Unable to connect to location services. Error: ${error}`, undefined);
        } else if (body.features.length == 0) {
            callback("Unable to find location. Try another search.", undefined);
        } else {
            const longitude = body.features[0].center[0];
            const latitude = body.features[0].center[1];
            const location = body.features[0].place_name;
            callback(undefined, {
                longitude: longitude,
                latitude: latitude,
                location: location
            });
        }
    });

};


module.exports = geocode;