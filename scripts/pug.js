const fs = require('fs')

const prefix = 'node_modules/@yababay67/pug-modules'

let content = fs.readFileSync(`${prefix}/index.pug`, 'utf-8')

for(const part of ['headers', 'main', 'footers']) {
    content = content.replaceAll(`include ${part}`, `include ${prefix}/${part}`)
}

fs.writeFileSync('src/pug_modules/index.pug', content)

