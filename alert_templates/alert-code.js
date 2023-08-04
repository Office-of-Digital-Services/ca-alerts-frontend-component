//@ts-check

/*
This is the "active" mode code when alerts are in place that checks for dismiss before rendering
*/

/**
 * @param {Document} _document
 * @param {Storage} _localStorage
 */
((_document, _localStorage) => {
  const messageSourceUrl = "[ALERT_ACTIVE_MESSAGE_HTML_URL]"; //This will be set to the HTML URL after the code is minified.
  const localStorageKey = "CaAlertsLocalStorageMessageDismissed";

  const localStorageTestValue = "Alerts can't be displayed.";
  try {
    // Testing Local Storage compatibility
    _localStorage.setItem(localStorageTestValue, localStorageTestValue);
    _localStorage.removeItem(localStorageTestValue);

    if (_localStorage.getItem(localStorageKey) !== messageSourceUrl) {
      //fetch the html template to render and put it in the DOM
      fetch(messageSourceUrl)
        .then(response => response.text())
        .then(
          html =>
            (_document.body.insertBefore(
              _document.createElement("iframe"),
              _document.body.childNodes[0]
            ).outerHTML = html)
        );
    }
  } catch {
    // Local storage does not work here
    console.error(localStorageTestValue);
  }
})(document, localStorage);
