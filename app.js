const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Record = require('./models/record')
const PORT = 4000

mongoose.connect('mongodb://localhost/record', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('error');
})
db.once('open', () => {
  console.log('mongoDB connected!');
})

const app = express()
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')


app.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(records => res.render('index', { records }))
    .catch(error => console.log(error))
})

// New
app.get('/new', (req, res) => {
  res.render('new')
})

app.post('/new', (req, res) => {

})

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
})