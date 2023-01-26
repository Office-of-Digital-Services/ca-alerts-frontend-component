//@ts-check
/* Node.JS Build Code */

// NORMAL vs ACTIVE
const buildModeNormal = "normal" === process.argv[2];

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

const inputJsFile = buildModeNormal ? "alert_templates/1_normalMode.js" : "alert_templates/2_activeMode.js";
console.log(`build running in ${buildModeNormal ? "NORMAL" : "ACTIVE"}...`);
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
  let htmlTemplate = (fs.readFileSync("alert_templates/popup.html", { encoding: 'utf8' }));
  if (buildModeNormal) {
    // Replace the default ALERT_MESSAGE with the test message in normal
    htmlTemplate = htmlTemplate.replace("[ALERT_MESSAGE]", testMessageData.message);
  }

  const htmlTemplate_Minified = await minifyHTML.minify(htmlTemplate, htmlMinifyOptions);

  const JsCode_Minified = (await minifyJS.minify(
    fs.readFileSync(inputJsFile,
      { encoding: 'utf8' })
      .replace("[HTML_CODE]", htmlTemplate_Minified),
    minifyOptions)).code || "";

  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir);

  fs.writeFileSync(`${targetDir}/alert.js`, JsCode_Minified, { encoding: 'utf8' });

  staticFilesToCopy.forEach(f => fs.copyFileSync(`test_page/${f}`, `${targetDir}/${f}`));

  console.log('build finished...');
})();