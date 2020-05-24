const request = require('request');


const forecast = (latitude, longitude, callback) =>{
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&appid=40ebdb8a899906c86baf2626d1d1f836&units=metric';
    request({url:url, json:true}, (error, response) =>{
        if(error)
        {
            callback('Unable to access weather service');
        }
        else if(response.body.message)
        {
            callback('Unable to find location');
        }
        else
        {
            callback(undefined,`${response.body.daily[0].weather[0].description}.
            Temperature outside is ${response.body.current.temp} degrees.
            Maximum temperature will be ${response.body.daily[0].temp.max} degrees.
            Minimum temperature will be ${response.body.daily[0].temp.min} degrees.`);
        }
   
    })

}
module.exports =  forecast;
