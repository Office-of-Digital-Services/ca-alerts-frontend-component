//@ts-check

/*
This is the "active" mode code when alerts are in place that checks for dismiss before rendering
*/

(async () => {
 const messageSourceUrl = "[ALERT_ACTIVE_MESSAGE_HTML_URL]"; //This will be set to the HTML URL after the code is minified.

 const localStorageKey = "CaAlertsLocalStorageMessageDismissed";

 const localStorageTestValue = "localStorageTest";
 try {
  // Testing Local Storage compatibility
  localStorage.setItem(localStorageTestValue, localStorageTestValue);
  localStorage.removeItem(localStorageTestValue);

  if (localStorage.getItem(localStorageKey) !== messageSourceUrl) {
   const containerSpan = document.createElement("span");

   //fetch the html template to render
   fetch(messageSourceUrl)
    .then(response => response.text())
    .then(html => (containerSpan.innerHTML = html));

   // Add a click event that only applies to the dismiss button
   containerSpan.addEventListener("click", function (e) {
    if (/** @type {Element} */ (e.target).id === "ca_alert_close_button") {
     localStorage.setItem(localStorageKey, messageSourceUrl);
     this.style.display = "none";
    }
   });

   //Add the object to the DOM
   document.body.appendChild(containerSpan);
  }
 } catch (e) {
  // Local storage does not work here
  console.error("Alerts can't be displayed.");
 }
})();
