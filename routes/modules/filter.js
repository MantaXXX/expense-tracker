const express = require('express')
const Record = require('../../models/record')
const Category = require('../../models/category')

const router = express.Router()

router.get('/', (req, res) => {
  Category.find()
    .lean()
    .then(categories => {
      Record.find()
        .lean()
        .sort({ date: 'asc' })
        .then(records => {
          const category = req.query.category
          if (category === '全部') {
            const totalAmount = records.map(filteredRecord => filteredRecord.amount).reduce((a, b) => { return a + b }, 0)
            return res.render('index', { records, totalAmount })
          } else {
            const filteredRecords = records.filter(filterRecord => filterRecord.category === category)
            const totalAmount = records.map(filteredRecord => filteredRecord.amount).reduce((a, b) => { return a + b }, 0)
            res.render('index', { records: filteredRecords, totalAmount, category })
          }
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})


module.exports = router