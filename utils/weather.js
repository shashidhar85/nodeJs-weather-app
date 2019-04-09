const request = require('request');


const weather = (lat, lng, callback) => {
    const url = 'https://api.darksky.net/forecast/a141f37bd9e67036681dd81b4e1ef48b/' + lat + ',' + lng + '?units=si';
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('network error', undefined);
        } else if (body.error) {
            callback(body.error, undefined);
        } else {
            callback(undefined, body);
        }
    });
}

module.exports = weather;