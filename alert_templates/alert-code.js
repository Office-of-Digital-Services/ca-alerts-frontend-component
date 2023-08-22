//@ts-check

/*
This is the "active" mode code when alerts are in place that checks for dismiss before rendering
*/

((_document, _localStorage, messageSourceUrl) => {
  const localStorageKey = "CaAlertsLocalStorageMessageDismissed";
  const documentBody = _document.body; //For minification
  const localStorageTestValue = `_${localStorageKey}_`;
  const loadAlert = () => {
    try {
      // Testing Local Storage compatibility
      _localStorage.setItem(localStorageTestValue, localStorageTestValue);
      _localStorage.removeItem(localStorageTestValue);

      if (_localStorage.getItem(localStorageKey) != messageSourceUrl)
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
    } catch {
      // Local storage does not work here
      console.error("Alerts can't be displayed.");
    }
  };
  // If we are viewing the target URL page then don't display anything
  if (_document.URL != "[ALERT_TARGET_URL]") return;

  _document.readyState == "complete"
    ? loadAlert() // Load event is history, inline execution, just do it
    : window.addEventListener("load", loadAlert);
})(document, localStorage, "[ALERT_ACTIVE_MESSAGE_HTML_URL]");
