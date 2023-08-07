//@ts-check

(() => {
  const iFrame = window.parent.document.getElementById("ca_alert_frame");

  document.getElementById("close_button").addEventListener(
    "click",

    () => {
      iFrame.style.display = "none"; //Will not be overridden by a resize to remove the hidden class

      //make sure CaAlertsLocalStorageMessageDismissed matches in alert-code.js

      localStorage.setItem(
        "CaAlertsLocalStorageMessageDismissed",
        "[ALERT_ACTIVE_MESSAGE_HTML_URL]"
      );
    }
  );

  /**
   * Set the outer iFrame height to match the inner content
   */
  const updateFrameHeight = () => {
    iFrame.style.height =
      document.getElementById("ca_alert").offsetHeight + "px";
    iFrame.className = ""; //Whatever classes we set to hide will be cleared
  };

  // Need to set the frame height when loaded AND during resize
  window.addEventListener("DOMContentLoaded", updateFrameHeight);
  window.addEventListener("resize", updateFrameHeight);
})();
