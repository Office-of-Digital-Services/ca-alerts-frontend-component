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
      console.log('Displaying CA Alert Message');
      const content = document.createElement("span");

      fetch(messageSourceUrl).then(response => response.text())
        .then(html => content.innerHTML = html);

      content.onclick = function () {
        //Add a dismiss function
        console.log('Dismissing Alert Message.')
        localStorage.setItem(localStorageKey, messageSourceUrl);
        content.style.display = "none";
      };;

      document.body.appendChild(content);
    }
  } catch (e) {
    // Local storage does not work here
    console.error("Alerts will not work because local storage is not supported in this browser.");
  }
})();