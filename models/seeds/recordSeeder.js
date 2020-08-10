const mongoose = require('mongoose')
const recordData = require('../../record.json').results
const Record = require('../record')
mongoose.connect('mongodb://localhost/record', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('error');
})
db.once('open', () => {
  console.log('mongoDB connected!')
  recordData.forEach(data => {
    Record.create({
      name: `${data.name}`,
      category: `${data.category}`,
      date: `${data.date}`,
      amount: `${data.amount}`
    })
  })
  console.log('Done!')
})
