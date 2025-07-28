if (item.link && item.link.className && item.link.className.includes("ot-sdk-show-preferences")) {
  e.preventDefault();
  if (window.OneTrust && typeof window.OneTrust.ToggleInfoDisplay === 'function') {
    window.OneTrust.ToggleInfoDisplay();
  }
}