const mongoose = require('mongoose')
const Category = require('../category')
mongoose.connect('mongodb://localhost/record', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('error');
})
db.once('open', () => {
  console.log('mongoDB connected!')
  Category.create(
    {
      category: '家居物業',
      icon: '<i class="fas fa-home fa-3x"></i>'
    },
    {
      category: '交通出行',
      icon: '<i class="fas fa-shuttle-van fa-3x"></i>'
    },
    {
      category: '休閒娛樂',
      icon: '<i class="fas fa-grin-beam fa-3x"></i>'
    },
    {
      category: '餐飲食品',
      icon: '<i class="fas fa-utensils fa-3x"></i>'
    },
    {
      category: '其他',
      icon: '<i class="fas fa-pen fa-3x"></i>'
    }
  )
  console.log('Category done!')
})

