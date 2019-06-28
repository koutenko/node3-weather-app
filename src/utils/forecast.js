const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/d33fb0761a30d1bdad709b9ab00a0eb5/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?units=si'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            let err = 'Unable to connect to weather services!'
            callback(err, undefined)
        } else if (body.error) {
            let err = 'Unable to find weather information. Try another search.'
            callback(err, undefined)
        } else {
            let weatherText = ' It is ' + Math.round(body.currently.temperature) + ' degrees Celsius outside. \r\n' + body.daily.data[0].summary + '\r\n There is ' + Math.round(body.currently.humidity * 100) + '% humidity. \r\n Chance of rain is ' + Math.round(body.currently.precipProbability * 100) + '%.'

            callback(undefined, weatherText)
        }
    })
}

module.exports = forecast