function openMail(activeTab) {
  var url = activeTab && activeTab.url;
  if (url) {
    browser.tabs.update({
      url: "mailto:?subject=Of%20interest&body=Interesting%3A%20" + encodeURIComponent(url)
    });
  }
}

browser.browserAction.onClicked.addListener(openMail);
