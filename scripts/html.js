import settings from '../src/settings.json'
import getHtml  from '../src/pug_modules/index.pug'
import * as fs from 'fs'

fs.writeFileSync('docs/index.html', getHtml(settings))

export default null

