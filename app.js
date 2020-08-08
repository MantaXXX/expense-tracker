const express = require("express")
const exphbs = require("express-handlebars")
const PORT = 3000

const app = express()
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')



app.get('/', (req, res) => {
  res.render('index')
})



app.listen(PORT, () => {
  console.log(`App is running on http://localhost${PORT}`);
})