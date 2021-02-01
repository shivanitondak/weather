const request = require('request')
const geocode = (tempaddress,callback)=>{
    const url1 = 'http://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(tempaddress)+'.json?access_token=pk.eyJ1Ijoicm9va2llc3MiLCJhIjoiY2tramQydWN3MXZyZTJ1bW5pYmpwZDl2NCJ9.5GzLpo6xoh6LIZqdoYQ77Q&limit=1'
    request({url:url1,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to map service',undefined)
        }else if(body.features.length===0){
            callback('Unable to find cordinates',undefined)
        }else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}
module.exports = geocode