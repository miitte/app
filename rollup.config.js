import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import marko from "@marko/rollup";
import postcss from "rollup-plugin-postcss";

import path from 'path';

export default [
	{
		input: 'src/main.js',
		output: [
			{ file: 'build/main.js', format: 'cjs' }
		]
	},
	{
		input: 'src/renderer.js',
    plugins: [
      marko(),
      nodeResolve({
        browser: true,
          extensions: [".js", ".marko"]
        }),
      // NOTE: Marko 4 compiles to commonjs, this plugin is also required.
      commonjs({
        extensions: [".js", ".marko"]
      }),
      // If using `style` blocks with Marko you must use an appropriate plugin.
      postcss({
        external: true
      })
    ],
		output: [
			{ file: 'build/renderer.js', format: 'cjs'},
		]
	}
];
