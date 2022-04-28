import { nodeResolve } from "@rollup/plugin-node-resolve"
import pug  from 'rollup-plugin-pug'
import json from '@rollup/plugin-json';
import run  from '@rollup/plugin-run';

export default {
    input: './scripts/html.js',
    output: {
        file: 'scripts/_html.js',
        format: 'cjs',
        exports: 'default'
    },
    plugins: [json(), run(), pug({pretty: true}), nodeResolve()]
}

