var defaultSubject = "FYI: {title}";
var defaultContent = "Interesting: {url}";
var tmplRegex = /{(url|title)}/g;

function substitute(match, prop) { return this[prop]; }

function launchUrl(subject, content, page_url, page_title,
    recipients) {
  var sub = substitute.bind({ url: page_url, title: page_title });
  subject = (subject || defaultSubject).replace(tmplRegex, sub);
  content = (content || defaultContent).replace(tmplRegex, sub);
  var mailto_url = [
    "mailto:",
    encodeURIComponent(recipients || ''),
    "?subject=",
    encodeURIComponent(subject),
    "&body=",
    encodeURIComponent(content),
  ].join('');
  getThisTab().then(tabs => {
    var tab = tabs[0];
    browser.tabs.create({
      index: tab.index,
      url: mailto_url
    }).then(tab => browser.tabs.remove(tab.id));
  });
}

function getPrefs() {
  return browser.storage.sync.get([
    'subject',
    'content',
    'recipients'
  ]);
}

function getThisTab() {
  return browser.tabs.query({
    currentWindow: true,
    active: true
  })
}

