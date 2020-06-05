const request = require('request')

const geocode = (address, callback) => {
    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + decodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicHJlZXRhbWRhdHRhIiwiYSI6ImNrYW1xMWpwaDByaXMyenBreGpyOThocDEifQ.xtmM_s1I3iFGmjb58NuBBA&limit=1'

    request({url: geocodeURL, json: true}, (error, {body} = {}) => {
        if(error) {
            callback('Cannot connect!', undefined)
        }
        else if(body.features.length === 0) {
            callback('Cannot find the location. Try another search.', undefined)
        }
        else {
            const latitude = body.features[0].center[1]
            const longitude = body.features[0].center[0]
            const location = body.features[0].place_name

            callback(undefined, {
                latitude,
                longitude,
                location
            })
        }
    })
}

module.exports = geocode