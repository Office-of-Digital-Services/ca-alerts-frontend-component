// @ts-check

((_window, _document) => {
  const iFrame = /** @type {HTMLObjectElement} */ (_window.frameElement);

  // Set the outer iFrame height to match the inner content
  const _fixSize = () =>
    (iFrame.height = `${_document.documentElement.offsetHeight}`);

  const _clearClass = () => (iFrame.className = "");

  const _addEventListener = (
    /** @type {Element | Window} */ _Element,
    /** @type {string} */ _type,
    /** @type {EventListener} */ _listener
  ) => _Element.addEventListener(_type, _listener);

  // Hide (Not dismiss) the alert if they tab in and then tab out.  Include everything that could be focused by a screen reader
  /** @type {Element[]} */
  const controls = [..._document.querySelectorAll("*")]; //Everything in the alert document
  controls.forEach(c => {
    _addEventListener(c, "blur", (/** @type {FocusEvent} */ e) => {
      if (!controls.includes(/** @type {Element} */ (e.relatedTarget)))
        iFrame.classList.add("temphidden");
    });

    _addEventListener(c, "focus", _clearClass);
  });

  _addEventListener(_window, "load", () => {
    _fixSize(); //Needed on load for Safari only
    _clearClass();
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
