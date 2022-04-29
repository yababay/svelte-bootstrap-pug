const fs = require('fs')

const settings = fs.readFileSync('src/settings.json', 'utf-8')

const buff = []

for(const [key, value] of Object.entries(JSON.parse(settings))) {
    buff.push(`- var ${key} = ${JSON.stringify(value)}`)
}

fs.writeFileSync('src/pug_modules/settings.pug', buff.join('\n') + '\n')

