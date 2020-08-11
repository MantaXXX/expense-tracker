const db = require('../../config/mongoose')
const recordData = require('../../record.json').results
const Record = require('../record')

db.once('open', () => {
  recordData.forEach(data => {
    Record.create({
      name: `${data.name}`,
      category: `${data.category}`,
      date: `${data.date}`,
      amount: `${data.amount}`
    })
  })
  console.log('Record done!')
})
