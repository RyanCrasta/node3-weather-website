const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode.js');

const forecast = require('./utils/forecast.js');



const app = express();

const port = process.env.PORT || 3000

//define paths for express config
const viewsPath = path.join(__dirname, '../templates/views');
const publicDirectoryPath = path.join(__dirname, '../public');
const partialPath = path.join(__dirname, '../templates/partials');

//setup static engine & views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('' , (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ryan Crasta',
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About me',
        name: 'Ryan Crasta'
    })

})

app.get('/help', (req, res) =>{
    res.render('help', {
        msg: 'Thank you for selecting the most reliable weather forecaster. Type in any place name in the location text box given and click on search, and there you go, weather forecast will be displayed on your screen. Simple and Fast. No ADs No Disturbance ',
        title: 'Help',
        name:'Ryan Crasta'
    })

})


app.get('/weather', (req, res) =>{

    if(!req.query.address)
    {
        res.send({error:'Please provide an address'});
    }
    else
    {
        
        geocode(req.query.address, (error, response) =>{
            if(error)
            {
                //console.log(error);
                res.send({
                    error: error
                })
            }
            else
            {
                const {latitude, longitude, location} = response;
        
        
                forecast(latitude,  longitude, (error, data) => {
                    if(error)
                    {
                        //console.log(error);  
                        res.send({
                            error: error
                        }) 
                    }
                    else
                    {
                        // console.log(location);
                    
                        // console.log(data);
                        res.send({
                            forecast: data,
                            location: location,
                            address: req.query.address,
                        });
                    }
                  })
            }
        });


        
    }
})


// app.get('/products', (req, res) =>{
    
//     if(!req.query.search)
//     {
//         res.send({
//             error: "You must provide a search term"
//         })
//     }
//     else{

//     console.log(req.query.search);

//     res.send({
//         products: []
//     })}
// })

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Ryan Crasta',
        msg: 'Help Article not found',
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Ryan Crasta',
        msg: 'Page not found',
    })
})


app.listen(port, () =>{
    console.log('Server is up on port '+port);
});
