// @ts-check

((_window, _document) => {
  const iFrame = /** @type {HTMLObjectElement} */ (_window.frameElement);

  const toggleHidden = () => {
    iFrame.classList.toggle("hidden");
  };

  const _addEventListener = (
    /** @type {Element | Window} */ _Element,
    /** @type {string} */ _type,
    /** @type {EventListener} */ _listener
  ) => _Element.addEventListener(_type, _listener);

  // Hide (Not dismiss) the alert if they tab in and then tab out.  Include everything that could be focused by a screen reader
  /** @type {Element[]} */
  const controls = [..._document.querySelectorAll("*")];
  controls.forEach(c => {
    _addEventListener(c, "blur", (/** @type {FocusEvent} */ e) => {
      if (!controls.includes(/** @type {Element} */ (e.relatedTarget))) {
        iFrame.style.opacity = "0";
      }
    });
    _addEventListener(c, "focus", () => {
      iFrame.style.opacity = "1";
    });
  });

  _addEventListener(_window, "load", toggleHidden);

  _addEventListener(_window, "resize", () => {
    // Set the outer iFrame height to match the inner content
    iFrame.height = `${_document.documentElement.offsetHeight}`;
  });

  _addEventListener(_document.querySelector("button"), "click", () => {
    toggleHidden();

    localStorage.setItem(
      "CaAlertsLocalStorageMessageDismissed", //make sure CaAlertsLocalStorageMessageDismissed matches in alert-code.js
      "[ALERT_ACTIVE_MESSAGE_HTML_URL]"
    );
  });
})(window, document);
