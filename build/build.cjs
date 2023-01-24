//@ts-check
/* Node.JS Build Code */

const testMessageData = {
  message: "This is a test message"
};

/**
* @type { import("html-minifier-terser").Options }
*/
const htmlMinifyOptions = {
  removeAttributeQuotes: true,
  removeTagWhitespace: true,
  collapseWhitespace: true,
  minifyCSS: true
};

/**
* @type { import("terser").MinifyOptions }
*/
const minifyOptions = {};

console.log('build running...');
const minifyJS = require("terser");
const minifyHTML = require("html-minifier-terser");
const fs = require("fs");

const targetDir = "_site";
const staticFilesToCopy =
  [
    "favicon.ico",
    "index.html"
  ];

(async () => {
  const htmlTemplate = (fs.readFileSync("alert_templates/popup.html", { encoding: 'utf8' }));
  const htmlTemplateNormal = htmlTemplate.replace("[ALERT_MESSAGE]", testMessageData.message);

  const htmlTemplateNormal_Minified = await minifyHTML.minify(htmlTemplateNormal, htmlMinifyOptions);

  const normalModeCode = (await minifyJS.minify(
    fs.readFileSync("alert_templates/1_normalMode.js",
      { encoding: 'utf8' })
      .replace("[HTML_CODE]", htmlTemplateNormal_Minified),
    minifyOptions)).code || "";

  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir);

  fs.writeFileSync(`${targetDir}/alert.js`, normalModeCode, { encoding: 'utf8' });

  staticFilesToCopy.forEach(f => fs.copyFileSync(`test_page/${f}`, `${targetDir}/${f}`));

  console.log('build finished...');
})();