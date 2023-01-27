//@ts-check
/* Node.JS Build Code */

//Tokens to replace
const tokenAlertHeading = '[ALERT_HEADING]';
const tokenAlertBody = '[ALERT_BODY]';
const tokenAlertTargetUrl = '[ALERT_TARGET_URL]';
const tokenAlertLinkClassHidden = '[ALERT_LINK_CLASS_HIDDEN]';
const tokenAlertHtmlDownload = '[ALERT_JAVASCRIPT_SOURCE_URL]';

const testMessageData = {
  body: "This is a test message",
  heading: "Heading",
  targetUrl: "https://ca.gov",
  linkClassHidden: "''"
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

console.log(`build running...`);
const minifyJS = require("terser");
const minifyHTML = require("html-minifier-terser");
const fs = require("fs");

const targetDir = "_site";
const distDir = `${targetDir}/dist`;
const sourceDir = "alert_templates";
const testSiteSourceDir = "test_page";
const inputJsFile = `${sourceDir}/1_client_check_code.js`;
const inputHtmlFile = `${sourceDir}/popup.html`;
const localTestHtml = `http://127.0.0.1:8080/dist/alert_test.html`
const staticFilesToCopy =
  [
    "favicon.ico",
    "index.html"
  ];

(async () => {
  const htmlTemplate = fs.readFileSync(inputHtmlFile, { encoding: 'utf8' });
  const htmlTemplate_Minified = await minifyHTML.minify(htmlTemplate, htmlMinifyOptions);

  const htmlTemplateTest_Minified =
    // Replace the default ALERT_MESSAGE with the test message in normal
    htmlTemplate_Minified
      .replace(tokenAlertHeading, testMessageData.heading)
      .replace(tokenAlertBody, testMessageData.body)
      .replace(tokenAlertTargetUrl, testMessageData.targetUrl)
      .replace(tokenAlertLinkClassHidden, testMessageData.linkClassHidden)

  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir);
  if (!fs.existsSync(distDir)) fs.mkdirSync(distDir);
  fs.writeFileSync(`${distDir}/alert_template.html`, htmlTemplate_Minified, { encoding: 'utf8' });
  fs.writeFileSync(`${distDir}/alert_test.html`, htmlTemplateTest_Minified, { encoding: 'utf8' });

  const JsCode_Minified = (await minifyJS.minify(fs.readFileSync(inputJsFile, { encoding: 'utf8' }), minifyOptions)).code || "";

  fs.writeFileSync(`${distDir}/alert_template.js`, JsCode_Minified, { encoding: 'utf8' });
  fs.writeFileSync(`${targetDir}/alert_LOCALTEST.js`, JsCode_Minified.replace(tokenAlertHtmlDownload, localTestHtml), { encoding: 'utf8' });

  staticFilesToCopy.forEach(f => fs.copyFileSync(`${testSiteSourceDir}/${f}`, `${targetDir}/${f}`));

  console.log('build finished...');
})();