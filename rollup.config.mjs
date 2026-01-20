import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts",
  external: ["react", "react-dom"],
  output: {
    file: "dist/bundle.umd.js",
    format: "umd",
    name: "NepaliDatePickerConverter",
    sourcemap: true,
    globals: {
      react: "React",
      "react-dom": "ReactDOM",
    },
    exports: "named",
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
    postcss({
      extract: true,
      minimize: true,
    }),
  ],
};
