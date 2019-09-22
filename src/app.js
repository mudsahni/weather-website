const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast.js');
const geocode = require('./utils/geocode.js');

const app = express();

// define paths for express configuration
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// telling express to use the handlebars engine
app.set('view engine', 'hbs');
// telling express to look in templates
app.set('views', viewsPath);
// telling express to look in partials
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectory));


app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Mudit Sahni"
    });
});
app.get("/help/*", (req, res) => {
    res.render('404', {
        title: "404",
        name: "Mudit Sahni",
        errorMessage: "404: help page not found."
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "Mudit Sahni"
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        name: "Mudit Sahni",
        message: "Hello darkness my old friend..."
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }
    res.send({
        products: []
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        } else {
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({
                        error: error
                    })
                } else {
                    return res.send({
                        location: location,
                        forecast: forecastData                        
                    })
                }
            });
        }
    });
});

app.get("*", (req, res) => {
    res.render('404', {
        title: "404",
        name: "Mudit Sahni",
        errorMessage: "404: page not found."
    });
});
// app.com




app.listen(3000, () => {
    console.log("Server is running on port 3000.");
});


