const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate')
const ExpressError = require('./utils/ExpressError.js')
const listing = require('./routes/listing.js')
const review = require('./routes/review.js')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.engine('ejs', ejsMate)
app.use(express.static('public'))
app.use(express.json())

main()
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })

async function main () {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust')
}

app.get('/', (req, res) => {
  res.send('okay')
})

//listing route
app.use('/listings', listing)
app.use('/listings/:id/reviews', review)

app.all('', (req, res, next) => {
  next(new ExpressError(404, 'Page Not Found!'))
})

app.use((err, req, res, next) => {
  let { statusCode = 500, message = 'Something went wrong!' } = err
  res.status(statusCode).render('error.ejs', { err})
})

app.listen(8080, () => {
  console.log('okay')
})
