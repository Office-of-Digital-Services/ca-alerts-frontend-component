//@ts-check
/* Node.JS Build Code */

//Tokens to replace
const tokenReplacementsBase = [
  { key: "[ALERT_HEADING]", value: "EMERGENCY ALERT" },
  {
    key: "[ALERT_BODY]",
    value:
      "The Governor has declared a state of emergency in all California counties."
  },
  { key: "[ALERT_TARGET_URL]", value: "https://ca.gov/" },
  { key: "[ALERT_LINK_CLASS_HIDDEN]", value: "''" }
];

const tokenReplacementsTest = [
  ...tokenReplacementsBase,
  { key: "[ALERT_ACTIVE_MESSAGE_HTML_URL]", value: "alert_test.html" }
];

const tokenReplacementsSample = [
  ...tokenReplacementsBase,
  {
    key: "[ALERT_ACTIVE_MESSAGE_HTML_URL]",
    value: "https://alert.cdt.ca.gov/sample/sample-alert.html"
  }
];

const tokenFrameBody = "[frame_body]";

/**
 * Replaces tokens in a string with the key/value pairs defined in tokenReplacements
 * @param {string} s the string that contains tokens to be replaced
 * @param {{key:string,value:string}[]} dict dictionary for value replacements
 * @example const newstring = replaceTokens(oldstring, tokens);
 *
 */
const replaceTokens = (s, dict) => {
  dict.forEach(t => {
    s = s.replace(t.key, t.value);
  });

  return s;
};

/**
 * @type { import("html-minifier-terser").Options }
 */
const htmlMinifyOptions = {
  removeAttributeQuotes: true,
  removeTagWhitespace: true,
  collapseWhitespace: true,
  minifyCSS: true,
  minifyJS: true,
  removeComments: true
};

/**
 * @type { import("terser").MinifyOptions }
 */
const minifyOptions = {};

console.log("build running...");
const minifyJS = require("terser");
const minifyHTML = require("html-minifier-terser");
const fs = require("fs");

const targetDir = "_site";
const distDir = "dist";
const distSampleDir = `${distDir}/sample`;
const distTemplatesDir = `${distDir}/templates`;
const sourceDir = "alert_templates";
const testSiteSourceDir = "test_page";
const outerHtml = `${sourceDir}/outer.html`;
const outerCss = `${sourceDir}/outer.css`;
const inputJsFile = `${sourceDir}/alert-code.js`;
const innerHtml = `${sourceDir}/inner.html`;
const innerCss = `${sourceDir}/inner.css`;
const innerJs = `${sourceDir}/inner.js`;
const staticFilesToCopy = ["favicon.ico", "index.html"];

(async () => {
  //The frame template has the iframe that goes on the outside
  const htmlFrameTemplate = `${fs.readFileSync(outerHtml, {
    encoding: "utf8"
  })}\n<style>\n${fs.readFileSync(outerCss, { encoding: "utf8" })}\n</style>`;

  //The body template goes inside the frame
  const htmlBodyTemplate = `${fs.readFileSync(innerHtml, {
    encoding: "utf8"
  })}<style>\n${fs.readFileSync(innerCss, {
    encoding: "utf8"
  })}\n</style><script>\n${fs.readFileSync(innerJs, {
    encoding: "utf8"
  })}\n</script>`;

  const htmlBodyTemplate_Minified = await minifyHTML.minify(
    htmlBodyTemplate,
    htmlMinifyOptions
  );

  // Put the minified body template in the frame and minify them together
  const htmlTemplate = htmlFrameTemplate.replace(
    tokenFrameBody,
    htmlBodyTemplate_Minified.replace(/"/g, "'") //the body template will need to switch to single quotes
  );

  const htmlTemplate_Minified = await minifyHTML.minify(
    htmlTemplate,
    htmlMinifyOptions
  );

  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir);
  if (!fs.existsSync(distDir)) fs.mkdirSync(distDir);
  if (!fs.existsSync(distSampleDir)) fs.mkdirSync(distSampleDir);
  if (!fs.existsSync(distTemplatesDir)) fs.mkdirSync(distTemplatesDir);

  fs.writeFileSync(`${distTemplatesDir}/alert.html`, htmlTemplate_Minified, {
    encoding: "utf8"
  });
  fs.writeFileSync(
    `${targetDir}/alert_test.html`,
    replaceTokens(htmlTemplate_Minified, tokenReplacementsTest),
    {
      encoding: "utf8"
    }
  );
  fs.writeFileSync(
    `${distSampleDir}/sample-alert.html`,
    replaceTokens(htmlTemplate_Minified, tokenReplacementsSample),
    {
      encoding: "utf8"
    }
  );

  const JsCode_Minified =
    (
      await minifyJS.minify(
        fs.readFileSync(inputJsFile, { encoding: "utf8" }),
        minifyOptions
      )
    ).code || "";

  fs.writeFileSync(`${distTemplatesDir}/alert.js`, JsCode_Minified, {
    encoding: "utf8"
  });
  fs.writeFileSync(
    `${targetDir}/alert_test.js`,
    replaceTokens(JsCode_Minified, tokenReplacementsTest),
    { encoding: "utf8" }
  );
  fs.writeFileSync(
    `${distSampleDir}/sample-alert.js`,
    replaceTokens(JsCode_Minified, tokenReplacementsSample),
    { encoding: "utf8" }
  );

  staticFilesToCopy.forEach(f =>
    fs.copyFileSync(`${testSiteSourceDir}/${f}`, `${targetDir}/${f}`)
  );

  console.log("build finished...");
})();
