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
  const documentBody = _document.body;

  const localStorageTestValue = `_${localStorageKey}_`;
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
            (documentBody.insertBefore(
              _document.createElement("iframe"),
              documentBody.firstChild
            ).outerHTML = html)
        );
    }
  } catch {
    // Local storage does not work here
    console.error("Alerts can't be displayed.");
  }
})(document, localStorage);
