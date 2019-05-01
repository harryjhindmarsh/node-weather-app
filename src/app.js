const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Defined Paths for Express Configuration
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup HandleBars Engine & Views Location (check out Express API Docs)
app.set('view engine', 'hbs') // set allows us to set a value for a given Express setting (name, value name)
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup Static Directory to Serve
app.use(express.static(publicDirectoryPath)) // use is used to customize our server

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Harry Hindmarsh',
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Harry Hindmarsh',
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        helpTextMessage: 'What do you need help with?',
        name: 'Harry Hindmarsh',
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an Address.'
        })
    } else {
       geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
                })
            })
       })
    }
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a Search term.'
        })
    } else {
        console.log(req.query)
        res.send({
            products: []
        })
    }
})

// Below are for Errors in the URL's

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Help',
        name: 'Harry Hindmarsh',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => { // * (wildcard) matches everything that hasn't been matched aka a URL we haven't set up (404)
    res.render('404', {
        title: '404',
        name: 'Harry Hindmarsh',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => { // this starts up the server (port)
    console.log('Server is running on port 3000')
}) 