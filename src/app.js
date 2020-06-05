const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

app.set('view engine', 'hbs')

app.use(express.static(path.join(__dirname, '../public')))

app.set('views', path.join(__dirname, '../templates/views'))

hbs.registerPartials(path.join(__dirname, '../templates/partials'))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        author: 'Preetam Datta'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        author: 'Preetam Datta',
        helptext: 'This is some helpful text'
    })
})

app.get('/about', (req, res) => {
    res.render('help', {
        title: 'About Page',
        author: 'Preetam Datta'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address

    if(!address) {
        return res.send({
            error : 'You must provide a search term'
        })
    }

    geocode(address, (error, {location, latitude, longitude} = {}) => {
        if(error)
            return res.send({error})
        
        forecast(latitude, longitude, (error, forecastData) => {
            if(error)
                return res.send({error})
            
            res.send({
                forecast: forecastData,
                location,
                address
            })            
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: '404',
        errorMessage: 'Help page not found',
        author: 'Preetam Datta'
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        title: '404',
        errorMessage: 'Page not found',
        author: 'Preetam Datta'
    })
})

app.listen(3000, () => {
    console.log('server started at port 3000')
})