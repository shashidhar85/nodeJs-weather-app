const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('../utils/geoCode');
const weather = require('../utils/weather');

const app = express();


// define paths for Ecpress configs
const publicDirectoryPath = path.join(__dirname, '../public');
const customPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebar engine and views location
app.set('view engine', 'hbs');
app.set('views', customPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        createdBy: 'Shashi'
    });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/help', (req, res) => {
    res.render('help');
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please enter address.'
        })
    }
    geoCode(req.query.address, (error, { lat, lng, location } = {}) => {
        if (error) {
            res.send({
                error: error
            })
            return;
        }
        weather(lat, lng, (error, body = {}) => {
            if (error) {
                res.send({
                    error: error
                })
                return;
            }
            res.send({
                location,
                forecast: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                rainingChances: body.currently.precipProbability,
                address: req.query.address,
            });
        });
    });
});

app.get('*', (req, res) => {
    res.render('404');
});

app.listen(3000, () => {
    console.log('server is up on port 3000.')
});
