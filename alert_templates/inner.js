// @ts-check

((/** @type {Window} */ _window, /** @type {Document} */ _document) => {
  /**
   * Minify friendly addEventListener
   */
  const _addEventListener = (
    /** @type {Element | Window} */ _Element,
    /** @type {string} */ _type,
    /** @type {EventListener} */ _listener
  ) => _Element.addEventListener(_type, _listener);

  const iFrame = /** @type {HTMLObjectElement} */ (_window.frameElement);
  /**
   * Set the outer iFrame height to match the inner content
   */
  const updateFrameHeight = () => {
    iFrame.height = `${_document.documentElement.offsetHeight}`;
    iFrame.className = ""; //Whatever classes we set to hide will be cleared
  };

  // Need to set the frame height when loaded AND during resize
  _addEventListener(_window, "DOMContentLoaded", updateFrameHeight);
  _addEventListener(_window, "resize", updateFrameHeight);
  _addEventListener(_document.querySelector("button"), "click", () => {
    iFrame.style.display = "none"; //Will not be overridden by a resize to remove the hidden class

    localStorage.setItem(
      "CaAlertsLocalStorageMessageDismissed", //make sure CaAlertsLocalStorageMessageDismissed matches in alert-code.js
      "[ALERT_ACTIVE_MESSAGE_HTML_URL]"
    );
  });
})(window, document);
