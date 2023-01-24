//@ts-check

/*
This is the "normal" mode code that checks for a test flag to display a test alert
*/

(async () => {
  const htmlCode = `[HTML_CODE]`;
  if (document.location.search.includes("activate_alert_test_now")) {
    //Display the test alert
    console.log('Displaying CA Alert Message');
    const content = document.createElement("span");
    content.innerHTML = htmlCode;
    document.body.appendChild(content);
  }
})();