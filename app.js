const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Record = require('./models/record')
const bodyParser = require('body-parser')
const helper = require('./helper')
const PORT = 4100

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
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', (req, res) => {
  Record.find()
    .lean()
    .sort({ date: 'asc' })
    .then(records => {
      let totalAmount = records.map(record => record.amount).reduce((a, b) => a + b, 0)
      res.render('index', { records, totalAmount })
    })
    .catch(error => console.log(error))
})

// New
app.get('/record/new', (req, res) => {
  return res.render('new')
})

app.post('/records', (req, res) => {
  const { name, category, date, amount } = req.body
  return Record.create({
    name,
    category,
    date,
    amount
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// Edit
app.get('/records/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then(records => res.render('edit', { records }))
    .catch(error => console.log(error))
})

app.post('/records/:id/edit', (req, res) => {
  const id = req.params.id
  const { name, category, date, amount } = req.body
  return Record.findById(id)
    .then(record => {
      record.name = name
      record.category = category
      record.date = date
      record.amount = amount
      return record.save()
    })
    .then(() => res.redirect(`/`))
    .catch(error => console.log(error))
})

// Delete
app.get('/records/:id/delete', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/filter/:category', (req, res) => {
  Record.find()
    .lean()
    .sort({ date: 'asc' })
    .then(record => {
      const category = req.params.category
      const records = record.filter(filterRecord => { return filterRecord.category === category })
      const totalAmount = records.map(filteredRecord => filteredRecord.amount).reduce((a, b) => { return a + b }, 0)
      res.render('index', { records, totalAmount, category })
    })
})


app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
})