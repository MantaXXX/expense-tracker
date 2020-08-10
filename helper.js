const Handlebars = require('handlebars')
Handlebars.registerHelper('if_same', function (category, selectedCategory, option) {
  if (category === selectedCategory) {
    return option.fn(this)
  }
  return option.inverse(this)
})