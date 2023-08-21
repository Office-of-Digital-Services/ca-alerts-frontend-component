// @ts-check

((_window, _document) => {
  const iFrame = /** @type {HTMLObjectElement} */ (_window.frameElement);
  const iFrameClassList = iFrame.classList;
  const tempHiddenClassName = "temphidden";

  // If visible, set the outer iFrame height to match the inner content
  const _fixSize = () =>
    (iFrame.style.height = iFrame.classList.contains(tempHiddenClassName)
      ? ""
      : `${_document.documentElement.offsetHeight}px`);

  const _clearFrameClass = () => (iFrame.className = "");

  const _addEventListener = (
    /** @type {Element | Window | Document} */ _Element,
    /** @type {string} */ _type,
    /** @type {EventListener} */ _listener
  ) => _Element.addEventListener(_type, _listener);

  // Hide (Not dismiss) the alert if they tab in and then tab out.
  _addEventListener(_document, "focusout", (/** @type {FocusEvent} */ e) => {
    if (!_document.contains(/** @type {Node} */ (e.relatedTarget)))
      iFrameClassList.add(tempHiddenClassName);
  });
  _addEventListener(_document, "focusin", _clearFrameClass);

  _addEventListener(_window, "load", () => {
    _fixSize(); //Needed on load for Safari only
    _clearFrameClass();
  });

  _addEventListener(_window, "resize", _fixSize);

  _addEventListener(_document.querySelector("button"), "click", () => {
    //Dismissed!
    iFrameClassList.add("hidden");

    localStorage.setItem(
      "CaAlertsLocalStorageMessageDismissed", //make sure CaAlertsLocalStorageMessageDismissed matches in alert-code.js
      "[ALERT_ACTIVE_MESSAGE_HTML_URL]"
    );
  });
})(window, document);
