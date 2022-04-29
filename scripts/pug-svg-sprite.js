const fs = require('fs')

const iconsPath  = './node_modules/bootstrap-icons/icons/'
const logoPath   = './docs/media/logo.svg'
const outputPath = './src/pug_modules/svg.pug'

const opening = '<svg style="display: none">\n'
const closing = '</svg>'

let buff = opening

const settings = JSON.parse(fs.readFileSync('./src/settings.json', 'utf-8'))
const sprite = settings.svgSprite

function getSvg(fn, path){
    let svg = fs.readFileSync(path, 'utf-8')
    svg = svg.replace(/[\r\n]/g, ' ')
    svg = svg.replace(/<\?[^\?]+\?>/, '')
    svg = svg.replace(/<sodi[^\/]+\/>/, '')
    svg = svg.replace(/<svg[^>]+>/, `<symbol id="${fn}" viewBox="0 0 16 16" fill="currentColor">`)
    svg = svg.replace('</svg>', '</symbol>')
    return `${svg}\n`
}

if(fs.existsSync(logoPath)) buff += getSvg('logo', logoPath)

if(!sprite || !sprite.length) buff += closing
else {
    for(const fn of sprite){
        const path = `${iconsPath}/${fn}.svg`
        if(!fs.existsSync(path)){
            console.log(`There is no ${fn} icon.`)
            continue
        }
        buff += getSvg(fn, path)
    }
    buff += closing
}

fs.writeFileSync(outputPath, buff)

