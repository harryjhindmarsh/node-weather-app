const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/7a5e909e93dba787ce9da73010af1845/' + latitude + ',' + longitude 
    
    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to Weather Services', undefined)
        } else if (body.error) {
            callback('Unable to find Location. Try another Search', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees Fahrenheit outside. There is a ' + body.currently.precipProbability + '% chance of rain, with a wind speed of ' + body.currently.windSpeed + '.') 
        }  
    })
}


module.exports = forecast