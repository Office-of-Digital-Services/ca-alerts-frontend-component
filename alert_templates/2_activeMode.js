//@ts-check

/*
This is the "active" mode code when alerts are in place that checks for dismiss before rendering
*/

(async () => {
  const htmlCode = `[HTML_CODE]`;
  const messageKey = `[MESSAGE_KEY]`;

  const localStorageKey = "CaAlertsLocalStorageMessageDismissed";

  const test = 'localStorageTest';
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);

    if (localStorage.getItem(localStorageKey) !== messageKey) {
      //No dismiss stored, display alert
      console.log('Displaying CA Alert Message');
      const content = document.createElement("span");
      content.innerHTML = htmlCode;
      document.body.appendChild(content);

      content.onclick = function () {
        //Add a dismiss function
        console.log('Dismissing Alert Message.')
        localStorage.setItem(localStorageKey, messageKey);
        content.style.display = "none";
      };;
    }
  } catch (e) {
    // Local storage does not work here
    console.error("Alerts will not work because local storage is not supported in this browser.");
  }
})();