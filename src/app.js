const path = require('path')
const express = require('express')
const ejs = require('ejs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')



const app = express()

//Define path and Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')

//Setup ejs engine and views location
app.set('view engine', 'ejs')
app.set('views', viewsPath)



app.use(express.static(publicDirectory))



app.get('/', (req,res) => {
  res.render('index', {
    title: 'Weather app',
    author: 'Tom Banks'
  })
})

app.get('/about', (req,res) => {
  res.render('about', {
    title: 'About bot',
    author: 'Tom Banks'
  })
})

app.get('/help', (req,res) => {
  res.render('help', {
    helpText: 'This is some helpful text',
    title: 'Help',
    author: 'Tom Banks'
  })
})

app.get('/weather', (req,res) => {
  if (!req.query.adress){
      return res.send('you must provide an adress!')
  } 

  geocode(req.query.adress, (error,{latitude, longitude, location} = {})=> {
    if(error) {
      return res.send({error})
    }
    
    forecast(latitude, longitude, (error, forecastData) => {
      if(error) {
        return res.send({error})
      }

      res.send({
        forecast: forecastData,
        location: location,
        adress: req.query.adress
      })
      
    })
  })
  
})

app.get('/help/*', (req,res) => {
  res.render('error', {
    title: '404',
    author: 'Tom Banks',
    error: 'Help article not found'
  })
})

app.get('*', (req,res) => {
  res.render('error', {
    title: '404',
    author:  'Tom banks',
    error: 'Page not found'
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000')
})