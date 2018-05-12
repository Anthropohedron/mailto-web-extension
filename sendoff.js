var defaultSubject = "FYI: {title}";
var defaultContent = "Interesting: {url}";
var tmplRegex = /{([a-zA-Z_]+)}/g;

function substitute(match, prop) { return this[prop]; }

function launchUrl(subject, content, url, title) {
  var sub = substitute.bind({ url: url, title: title });
  subject = (subject || defaultSubject).replace(tmplRegex, sub);
  content = (content || defaultContent).replace(tmplRegex, sub);
  browser.tabs.update({
    url: "mailto:?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(content)
  });

}

function openMail(activeTab) {
  var url = activeTab && activeTab.url;
  if (url) {
    browser.storage.sync.get([ 'subject', 'content' ]).then((res) =>
      launchUrl(res.subject, res.content, url, activeTab.title));
  }
}

browser.browserAction.onClicked.addListener(openMail);
