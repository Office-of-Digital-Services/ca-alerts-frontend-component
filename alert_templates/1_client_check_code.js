//@ts-check

/*
This is the "active" mode code when alerts are in place that checks for dismiss before rendering
*/

(async () => {
  const messageSourceUrl = `[ALERT_JAVASCRIPT_SOURCE_URL]`;

  const localStorageKey = "CaAlertsLocalStorageMessageDismissed";

  const test = 'localStorageTest';
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);

    if (localStorage.getItem(localStorageKey) !== messageSourceUrl) {
      const content = document.createElement("span");

      //fetch the html template to render
      fetch(messageSourceUrl)
        .then(response => response.text())
        .then(html => content.innerHTML = html);

      //Add a dismiss function
      content.onclick = function () {
        console.log('Dismissing Alert Message.')
        localStorage.setItem(localStorageKey, messageSourceUrl);
        content.style.display = "none";
      };

      //Add the object to the DOM
      document.body.appendChild(content);
    }
  } catch (e) {
    // Local storage does not work here
    console.error("Alerts can't be displayed.");
  }
})();