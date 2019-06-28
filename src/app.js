const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const http = require('http')
const url = require('url')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


// Home page
app.get('', (req, res) => {
    res.render('index', {
        title: 'cloudtiger',
        name: 'Jimin McClain',
        geocode
    })
})

// About page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Jimin McClain'
    })
})

// Help page
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Jimin McClain',
        message: 'This is a help page.'
    })
})

// Weather Get
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error:'No location provided. Try your search again with a search term.'
        })
    }
    console.log(req.query.address)
    geocode((req.query.address), (error, { latitude, longitude, location } = {}) => {
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
})

// 404 wildcards
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Help article not found.',
        name: 'Jimin McClain'})
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Page not found.',
        name: 'Jimin McClain'
    })
})

// Listen
app.listen(port, () => {
    console.log('Server is up on port ' + port + '.')
})