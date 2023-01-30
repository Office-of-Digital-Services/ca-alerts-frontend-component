//@ts-check

/*
This is the "active" mode code when alerts are in place that checks for dismiss before rendering
*/

(async () => {
 const messageSourceUrl = "[ALERT_ACTIVE_HTML_URL]"; //This will be set to the HTML URL after the code is minified.

 const localStorageKey = "CaAlertsLocalStorageMessageDismissed";

 const test = "localStorageTest";
 try {
  localStorage.setItem(test, test);
  localStorage.removeItem(test);

  if (localStorage.getItem(localStorageKey) !== messageSourceUrl) {
   const content = document.createElement("span");

   //fetch the html template to render
   fetch(messageSourceUrl)
    .then(response => response.text())
    .then(html => (content.innerHTML = html));

   content.addEventListener("click", function (e) {
    if (/** @type {Element} */ (e.target).tagName === "BUTTON") {
     localStorage.setItem(localStorageKey, messageSourceUrl);
     this.style.display = "none";
    }
   });

   //Add the object to the DOM
   document.body.appendChild(content);
  }
 } catch (e) {
  // Local storage does not work here
  console.error("Alerts can't be displayed.");
 }
})();
