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
      name: `${date.name}`,
      category: `${date.category}`,
      date: `${date.date}`,
      amount: `${date.amount}`
    })
  })
  console.log('Done!');
})

module.exports = mongoose.model('Record', recordSchema)