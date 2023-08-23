//@ts-check

/*
This is the "active" mode code when alerts are in place that checks for dismiss before rendering
*/

(messageSourceUrl => {
  const localStorageKey = "CaAlertsLocalStorageMessageDismissed";
  // eslint-disable-next-line prefer-template
  const localStorageKey_Test = "_" + localStorageKey;
  const _document = document; //For minification
  const _documentBody = _document.body; //For minification
  const loadAlert = () => {
    try {
      // Testing Local Storage compatibility
      const _localStorage = localStorage;
      _localStorage.setItem(localStorageKey_Test, messageSourceUrl);
      _localStorage.removeItem(localStorageKey_Test);

      if (_localStorage.getItem(localStorageKey) != messageSourceUrl) {
        //fetch the html template to render and put it in the DOM
        fetch(messageSourceUrl)
          .then(async response => {
            if (response.ok) {
              // found the HTML template
              _documentBody.insertBefore(
                _document.createElement("iframe"),
                _documentBody.firstChild
              ).outerHTML = await response.text();
            } else {
              // Response is NOT ok.  Error out of this promise.
              throw new Error();
            }
          })
          .catch(fetchError => fetchError); // Fetch Errors will just not display the alert.
      }
    } catch (localStorageError) {
      // Local storage does not work here.

      console.log(localStorageError); //Put the error in the log, but don't disrupt the page by throwing it
    }
  };

  if (_document.URL != "[ALERT_TARGET_URL]") {
    // Only show the alert if we aren't on the target URL
    if (_document.readyState != "complete") {
      // Under normal circumstances, this code we be added before the load
      window.addEventListener("load", loadAlert);
    } else {
      // Load event is history, inline execution, just do it
      loadAlert();
    }
  }
})("[ALERT_ACTIVE_MESSAGE_HTML_URL]");
