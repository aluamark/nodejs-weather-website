const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c8cb4d2c789e087364c73d13b3ef1a61&query='+ latitude +','+ longitude +'&units=f'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services!')
        } else if (body.error) {
            callback(body.error.info)
        } else {
            callback(undefined, {
                time: body.location.localtime,
                forecast: `In ${body.location.name}, ${body.location.country}, the temperature is ${body.current.temperature} degrees. There is a ${body.current.precip}% chance of rain.`
            })
        }
    })
}

module.exports = forecast