const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { get } = require('request')

const app = express()
const port = process.env.PORT || 3000

// Defining paths for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsDirectory = path.join(__dirname, '../templates/views')
const partialsDirectory = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and change views location
app.set('view engine', 'hbs')
app.set('views', viewsDirectory)
hbs.registerPartials(partialsDirectory)

// Setup static directory
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Mark Alua'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Mark Alua'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        contact: '656-1212',
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: 'Please provide an address!'})
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, { time, forecast }) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                searchAddress: req.query.address,
                location,
                time,
                forecast
            })            
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Please provide a search term!'
        })
    }

    res.send({
        product: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help article not found!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found!'
    })
})

app.listen(port, () => {
    console.log('Server is up on port' + port + '.')
})
