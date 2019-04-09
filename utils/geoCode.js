const request = require('request');


const geoCode = (address, callback) => {
    const geoCodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoic2hhc2hpODUiLCJhIjoiY2p1N3pxYzNlMHVyaDQ0bnpycnQ5enVhNCJ9.ab64HCl4eKb3Ung4M8Zljg&limit=1';
    request({ url: geoCodeUrl, json: true }, (error, { body }) => {
        if (error) {
            callback('network error', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location, Try another search.')
        } else {
            callback(undefined, {
                lat: body.features[0].center[1],
                lng: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    });
}

module.exports = geoCode;