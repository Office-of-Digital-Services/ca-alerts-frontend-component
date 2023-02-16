//@ts-check
/* Node.JS Build Code */

//Tokens to replace

const tokenReplacements = [
 { key: "[ALERT_HEADING]", value: "EMERGENCY ALERT" },
 {
  key: "[ALERT_BODY]",
  value:
   "Governor Newsom has declared a state of emergency in all Sacramento counties."
 },
 { key: "[ALERT_TARGET_URL]", value: "https://ca.gov" },
 { key: "[ALERT_LINK_CLASS_HIDDEN]", value: "''" },
 { key: "[ALERT_ACTIVE_MESSAGE_HTML_URL]", value: "alert_test.html" }
];

const tokenFrameBody = "[frame_body]";

/**
 * Replaces tokens in a string with the key/value pairs defined in tokenReplacements
 * @param {string} s the string that contains tokens to be replaced
 * @example const newstring = replaceTokens(oldstring);
 *
 */
const replaceTokens = s => {
 tokenReplacements.forEach(t => {
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
 minifyJS: true
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
const distDir = `${targetDir}/dist`;
const sourceDir = "alert_templates";
const testSiteSourceDir = "test_page";
const inputFrame = `${sourceDir}/iframe-border.html`;
const inputJsFile = `${sourceDir}/alert-code.js`;
const inputHtmlFile = `${sourceDir}/iframe-body.html`;
//const localTestHtml = "alert_test.html";
const staticFilesToCopy = ["favicon.ico", "index.html"];

(async () => {
 //The frame template has the iframe that goes on the outside
 const htmlFrameTemplate = fs.readFileSync(inputFrame, { encoding: "utf8" });

 //The body template goes inside the frame
 const htmlBodyTemplate = fs.readFileSync(inputHtmlFile, { encoding: "utf8" });

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

 const htmlTemplateTest_Minified =
  // Replace the default ALERT_MESSAGE with the test message in normal
  replaceTokens(htmlTemplate_Minified);
 //   .replace(tokenAlertHeading, testMessageData.heading)
 //   .replace(tokenAlertBody, testMessageData.body)
 //   .replace(tokenAlertTargetUrl, testMessageData.targetUrl)
 //   .replace(tokenAlertLinkClassHidden, testMessageData.linkClassHidden);

 if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir);
 if (!fs.existsSync(distDir)) fs.mkdirSync(distDir);
 fs.writeFileSync(`${distDir}/alert.html`, htmlTemplate_Minified, {
  encoding: "utf8"
 });
 fs.writeFileSync(`${targetDir}/alert_test.html`, htmlTemplateTest_Minified, {
  encoding: "utf8"
 });

 const JsCode_Minified =
  (
   await minifyJS.minify(
    fs.readFileSync(inputJsFile, { encoding: "utf8" }),
    minifyOptions
   )
  ).code || "";

 fs.writeFileSync(`${distDir}/alert.js`, JsCode_Minified, {
  encoding: "utf8"
 });
 fs.writeFileSync(
  `${targetDir}/alert_test.js`,
  replaceTokens(JsCode_Minified), //.replace(tokenAlertHtmlDownload, localTestHtml),
  { encoding: "utf8" }
 );

 staticFilesToCopy.forEach(f =>
  fs.copyFileSync(`${testSiteSourceDir}/${f}`, `${targetDir}/${f}`)
 );

 console.log("build finished...");
})();
