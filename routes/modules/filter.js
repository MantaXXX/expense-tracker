const express = require('express')
const Record = require('../../models/record')
const Category = require('../../models/category')

const router = express.Router()

router.get('/:category', (req, res) => {
  Category.find()
    .lean()
    .then(categories => {
      Record.find()
        .lean()
        .sort({ date: 'asc' })
        .then(record => {
          const category = req.params.category
          const records = record.filter(filterRecord => { return filterRecord.category === category })
          const totalAmount = records.map(filteredRecord => filteredRecord.amount).reduce((a, b) => { return a + b }, 0)
          res.render('index', { records, totalAmount, category })
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})


module.exports = router