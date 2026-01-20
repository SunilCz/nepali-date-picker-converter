import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import typescript from "@rollup/plugin-typescript";

const plugins = [
  resolve(),
  commonjs(),
  typescript({
    compilerOptions: {
      module: "ESNext",
    }
  }),
  postcss({
    extract: true,
    minimize: true,
  }),
];

export default [
  // 1. Core Bundle (React-free)
  {
    input: "src/core.ts",
    output: {
      file: "dist/bundle.umd.js",
      format: "umd",
      name: "NepaliDatePickerConverter",
      sourcemap: true,
      exports: "named",
    },
    plugins,
  },
  // 2. React Bundle (Requires React)
  {
    input: "src/index.ts",
    external: ["react", "react-dom"],
    output: [
      {
        file: "dist/bundle.react.umd.js",
        format: "umd",
        name: "NepaliDatePickerConverter",
        sourcemap: true,
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        exports: "named",
      },
      {
        file: "dist/index.mjs",
        format: "es",
        sourcemap: true,
      }
    ],
    plugins,
  },
];
