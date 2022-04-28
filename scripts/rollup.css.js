import css from 'rollup-plugin-css-only'

export default {
	input: 'scripts/css.js',
    output: {
        sourcemap: true,
        format: 'iife',
        name: 'css',
        file: 'docs/build/css.js'
    },
    plugins: [
        css({ output: 'custom.css' })
    ]
}
