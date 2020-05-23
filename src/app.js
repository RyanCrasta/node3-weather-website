const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode.js');

const forecast = require('./utils/forecast.js');



const app = express();

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
        msg: 'Not him old music think his found enjoy merry. Listening acuteness dependent at or an. Apartments thoroughly unsatiable terminated sex how themselves. She are ten hours wrong walls stand early. Domestic perceive on an ladyship extended received do. Why jennings our whatever his learning gay perceive. Is against no he without subject. Bed connection unreserved preference partiality not unaffected. Years merit trees so think in hoped we as. ',
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


app.listen(3000, () =>{
    console.log('Server is up on port 3000');
});
