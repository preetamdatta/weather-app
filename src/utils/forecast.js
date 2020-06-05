const request = require('request')

const forecast = (lat, lon, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=0b71f4b336754900dbbf3ed8aa79988c&query=' + decodeURIComponent(lat) + ',' + decodeURIComponent(lon)

    request({url: url, json: true}, (error, {body} = {}) => {
        if(error) {
            callback('Cannot connect!', undefined)
        }
        else if(body.error) {
            callback('Cannot find the location', undefined)
        }
        else {
            const weather = body.current
            callback(undefined, 'It is currently ' + weather.temperature + ' degrees out. Feels like ' + weather.feelslike + ' degrees out.')            
        }
        
    })
}

module.exports = forecast