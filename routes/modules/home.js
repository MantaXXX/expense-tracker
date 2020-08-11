const express = require('express')
const Record = require('../../models/record')
const Category = require('../../models/category')

const router = express.Router()

router.get('/', (req, res) => {
  Category.find()
    .lean()
    .then(category => {
      Record.find()
        .lean()
        .sort({ date: 'asc' })
        .then(records => {
          let totalAmount = records.map(record => record.amount).reduce((a, b) => a + b, 0)
          res.render('index', { records, totalAmount })
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})

module.exports = router