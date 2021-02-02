const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path = require('path')

//const express is a function as express library exports as a single function
//express is to access the web:web framework
const express = require('express')
//handlebars is for dynamic templating
//hbs provides integration between express and handlebars
//hbs needs to be loaded to work with partials
const hbs = require('hbs')
const app = express()

const port = process.env.PORT ||3000
//console.log(__dirname)
//path.join function is to manipulate paths
//.. is to come out of 1 directory
// ../.. is to come out of 2 dir
//console.log(path.join(__dirname,'../public'))
//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//set function is to do handlebars setting(exact setting name, exact module for setting)
//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//below code will not run as it is referring other path
//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    //handlebars/dynamic templates are called views for which render gets in use
    //by default express look for files in views names folder for any other path we have to tell express
    res.render('index',{
        title: 'Weather',
        name: 'Shivani'
    })
    //no need to file extension
    //render has two arguments---view--object containing value
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name: 'ST'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        msg: 'This is a help section.',
        title:'About me',
        name:'Shivani'
    })
})


//get method is for what server will send back to request
//get method has 2 arguments---URL(route)---what to send back after URL
//function has 2 arguments---object containing info of incoming request
// app.get('',(req,res)=>{
//     res.send('<h1>Hello Express!</h1>')
// })
// app.get('/help',(req,res)=>{
//     res.send([{
//         name:'Shivani',
//         age: 25
//     },{
//         name:'Andrew',
//         age: 27
//     }])
// })
// app.get('/about',(req,res)=>{
//     res.send('<h1>About Page</h1>')
// })
app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error: 'Address is required!!'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
    if (error){
        return res.send({
            //error: error(Use shorthand)
            error
        })
    }forecast(latitude,longitude, (error, forecastData) => {
        if(error){
            return res.send({
            error
        })
    }res.send({
    //location: location, Use shorthand
    location,
    forecast: forecastData
    })
  })
})
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term.'
        })
    }
    //query is an object
    console.log(req.query.search)
    //cannot set headers error is bcz res.send cannot be present twice
    res.send({
        products:[]
    })
})
//app.com
//app.com/help
//app.com/about

//to render any other path, that's why it needs to code at last
//as express looks for routes up to down
app.get('/help/*',(req,res)=>{
    //res.('Help not found')
    res.render('error',{
        title:'404',
        error:'Help article not found',
        name:'tondakhelp'
    })
})
app.get('*',(req,res)=>{
    //res.send('My 404 page')
    res.render('error',{
        title:'404',
        error: 'Page not found',
        name: 'tondak'
    })
})

//to start the server
app.listen(port,()=>{
    console.log('Server is up on port '+port+'.')
}) //3000 is default development port
//ctrl+c to terminate server