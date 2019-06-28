const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/d33fb0761a30d1bdad709b9ab00a0eb5/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?units=si'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (body.error) {
            callback('Unable to find weather information. Try another search.', undefined)
        } else {
            callback(undefined, 'It is '+ body.currently.temperature + ' degrees outside. ' + body.daily.data[0].summary + ' There is ' + (body.currently.humidity * 100) + '% humidity. Chance of rain is ' + body.currently.precipProbability + '%.')
            // callback(undefined, {
            //     temperature: body.currently.temperature,
            //     summary: body.daily.data[0].summary,
            //     humidity: body.currently.humidity,
            //     chanceOfRain: body.currently.precipProbability
            // })
        }
    })
}

module.exports = forecast