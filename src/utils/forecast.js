const request = require('request')

forecast=(latitude,longitude,callback)=>{
    const url2 = 'http://api.weatherstack.com/current?access_key=eb1bb9a8407303385c864a66d1b96f81&query='+longitude+','+latitude+'&units=f'
    //request({url:url2,json:true},(error,response)=>{
        request({url:url2,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to weather service',undefined)
        }//else if(response.body.error){
            else if(body.error){
            callback('Unable to find location',undefined)
        }else{
            //callback(undefined,response.body.current.weather_descriptions[0]+'. It is currently '+response.body.current.temperature+' degrees out. It feels like '+response.body.current.feelslike+' degrees out.')
            callback(undefined,body.current.weather_descriptions[0]+'. It is currently '+body.current.temperature+' degrees out. It feels like '+body.current.feelslike+' degrees out. Also, UV Index at your area is '+body.current.uv_index+'.')
        }
    })

}
module.exports = forecast