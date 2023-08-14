// @ts-check

((_window, _document) => {
  const iFrame = /** @type {HTMLObjectElement} */ (_window.frameElement);

  // Set the outer iFrame height to match the inner content
  const _fixSize = () =>
    (iFrame.height = `${_document.documentElement.offsetHeight}`);

  const _clearFrameClass = () => (iFrame.className = "");

  const _addEventListener = (
    /** @type {Element | Window | Document} */ _Element,
    /** @type {string} */ _type,
    /** @type {EventListener} */ _listener
  ) => _Element.addEventListener(_type, _listener);

  // Hide (Not dismiss) the alert if they tab in and then tab out.
  _addEventListener(_document, "focusout", (/** @type {FocusEvent} */ e) => {
    if (!_document.contains(/** @type {Element} */ (e.relatedTarget)))
      iFrame.classList.add("temphidden");
  });
  _addEventListener(_document, "focusin", _clearFrameClass);

  _addEventListener(_window, "load", () => {
    _fixSize(); //Needed on load for Safari only
    _clearFrameClass();
  });

  _addEventListener(_window, "resize", _fixSize);

  _addEventListener(_document.querySelector("button"), "click", () => {
    //Dismissed!
    iFrame.classList.add("hidden");

    localStorage.setItem(
      "CaAlertsLocalStorageMessageDismissed", //make sure CaAlertsLocalStorageMessageDismissed matches in alert-code.js
      "[ALERT_ACTIVE_MESSAGE_HTML_URL]"
    );
  });
})(window, document);
