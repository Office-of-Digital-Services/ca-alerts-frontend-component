/* Node.JS Build Code */

console.log('build running...');
const minifyJS = require("terser");
const minifyHTML = require("html-minifier-terser");
const fs = require("fs");

(async () => {
  const htmlTemplate = fs.readFileSync("alert_templates/popup.html", { encoding: 'utf8' });
  const htmlMin = await minifyHTML.minify(htmlTemplate, {
    removeAttributeQuotes: true,
    removeTagWhitespace: true,
    collapseWhitespace: true,
    minifyCSS: true
  });

  const jsFiles = [
    "alert_templates/alert1.js",
    "alert_templates/alert2.js",
    "alert_templates/alert3.js"
  ];
  const code = jsFiles.map(
    f => fs.readFileSync(f, { encoding: 'utf8' })
  );

  code.unshift(`const htmlCode = \`${htmlMin}\``);

  /**
   * @type { import("terser").MinifyOptions }
   */
  const options = {};

  const result = await minifyJS.minify(code, options);

  const targetDir = "_site";
  const distDir = "dist";

  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir);
  if (!fs.existsSync(distDir)) fs.mkdirSync(distDir);

  fs.writeFileSync(`${targetDir}/alert.js`, result.code, { encoding: 'utf8' });

  fs.writeFileSync(`${distDir}/alert.js`, result.code, { encoding: 'utf8' });

  const staticFilesToCopy =
    ["favicon.ico", "index.html"];

  staticFilesToCopy.forEach(f => fs.copyFileSync(`test_page/${f}`, `${targetDir}/${f}`));

  console.log('build finished...');
})();