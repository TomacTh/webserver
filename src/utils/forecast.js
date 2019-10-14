const request = require('request')

const forecast = (latitude,longitude,callback) => {
  const url = `https://api.darksky.net/forecast/f93255c7234fbda5be875c286bf756fb/${latitude},${longitude}?units=si`

  request({url, json: true}, (error, {body}) => {
    if(error){
        callback('Unable to connect', undefined)
    } else if (body.error){
        callback('Unable to find location', undefined)
    } else {
        callback(undefined, `${body.daily.data[0].summary}  It is currently ${body.currently.temperature} degrees out. This high today ${body.daily.data[0].temperatureHigh} with a low of ${body.daily.data[0].temperatureLow}. There is ${body.currently.precipProbability}% chance of rain`)
    }
  })
}

module.exports = forecast