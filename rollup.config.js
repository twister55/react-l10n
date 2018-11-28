import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';
import uglify from 'rollup-plugin-uglify';

const pkg = require('./package.json');
const env = process.env.NODE_ENV || 'development';

export default {
    input: 'src/index.ts',
    output: [{
        file: pkg.main,
        name: 'react-l10n',
        format: 'umd',
        sourcemap: true,
        exports: 'named',
        globals: {
            react: 'React'
        },
    }],
    external: [
        'react'
    ],
    watch: {
        include: 'src/**',
    },
    plugins: [
        // Compile TypeScript files
        typescript({ useTsconfigDeclarationDir: true }),
        // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
        commonjs(),
        // Allow node_modules resolution, so you can use 'external' to control
        // which external modules to include in the bundle
        // https://github.com/rollup/rollup-plugin-node-resolve#usage
        resolve(),
        // Resolve source maps to the original source
        sourceMaps(),
    ],
};
