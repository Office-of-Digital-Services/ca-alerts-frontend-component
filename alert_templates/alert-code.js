//@ts-check

/*
This is the "active" mode code when alerts are in place that checks for dismiss before rendering
*/

(() => {
 const messageSourceUrl = "[ALERT_ACTIVE_MESSAGE_HTML_URL]"; //This will be set to the HTML URL after the code is minified.
 const localStorageKey = "CaAlertsLocalStorageMessageDismissed";

 const localStorageTestValue = "localStorageTest";
 try {
  // Testing Local Storage compatibility
  localStorage.setItem(localStorageTestValue, localStorageTestValue);
  localStorage.removeItem(localStorageTestValue);

  if (localStorage.getItem(localStorageKey) !== messageSourceUrl) {
   //fetch the html template to render and put it in the DOM
   fetch(messageSourceUrl)
    .then(response => response.text())
    .then(
     html =>
      (document.body.appendChild(document.createElement("iframe")).outerHTML =
       html)
    );
  }
 } catch {
  // Local storage does not work here
  console.error("Alerts can't be displayed.");
 }
})();
