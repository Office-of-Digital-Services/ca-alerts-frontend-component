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

  /** @type {NodeListOf<Element>} */
  const controls = _document.querySelectorAll("a, button");

  controls.forEach(c => {
    _addEventListener(c, "blur", () => {
      iFrame.style.opacity = "0";
      iFrame.ariaHidden = "true";
    });

    _addEventListener(c, "focus", () => {
      iFrame.style.opacity = "1";
      iFrame.ariaHidden = "";
    });
  });
})(window, document);
