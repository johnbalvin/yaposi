/*
Steps to bundle it
1. Intall nodejs
2. Intall rollup: npm install --global rollup
3. Run:           rollup --config rollup.config.js
4. Bundle file will be at dist/yaposi2.js
5. Modify the bundle file as I did, so this can work as module .mjs and as normal .js
*/
export default [{
  input: "src/yaposi.js",
  output: {
    format: "umd",
    file: "dist/full/yaposi2.js",
    name: "Yaposi"
  },
},{
  input: "src/render.js",
  output: {
    format: "umd",
    file: "dist/parts/render2.js",
    name: "Yaposi"
  },
}];