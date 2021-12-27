const html = require('./html.js')
const fs = require('fs')

fs.writeFileSync('./public/index.html', html())

