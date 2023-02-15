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
   const containerSpan = document.createElement("span");

   //fetch the html template to render
   fetch(messageSourceUrl)
    .then(response => response.text())
    .then(
     html =>
      (containerSpan.innerHTML = html
       .replace("[LocalStorageKey]", localStorageKey) //The template HTML will be setting local storage to match what we are checking
       .replace("[LocalStorageValue]", messageSourceUrl)) //Make sure it matches in body content
    );

   //Add the object to the DOM
   document.body.appendChild(containerSpan);
  }
 } catch (e) {
  // Local storage does not work here
  console.error("Alerts can't be displayed.");
 }
})();
