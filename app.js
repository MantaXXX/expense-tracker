const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Record = require('./models/record')
const Category = require('./models/category')
const bodyParser = require('body-parser')
const helper = require('./helper')
const category = require('./models/category')
const methodOverride = require('method-override')
const routes = require('./routes')
require('./config/mongoose')
const PORT = process.env.PORT || 3000

const app = express()
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)


app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
})