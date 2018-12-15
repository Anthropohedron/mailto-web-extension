function substitute(match, prop) { return this[prop]; }
var defaultSubject = "FYI: {title}";
var defaultContent = "Interesting: {url}";
var tmplRegex = /{([a-zA-Z_]+)}/g;

function launchUrl(subject, content, page_url, page_title, recipient) {
  var sub = substitute.bind({ url: page_url, title: page_title });
  subject = (subject || defaultSubject).replace(tmplRegex, sub);
  content = (content || defaultContent).replace(tmplRegex, sub);
  var mailto_url = [
    "mailto:",
    encodeURIComponent(recipient),
    "?subject=",
    encodeURIComponent(subject),
    "&body=",
    encodeURIComponent(content),
  ].join('');
  browser.tabs.update({
    url: mailto_url
  });
}

function openMailWithRecipient(e) {
  browser.tabs.query({currentWindow: true, active: true}).then(function(tabs) {
    var recipient = e.target.innerText;
    browser.storage.sync.get([ 'subject', 'content' ]).then(function(res) {
      launchUrl(res.subject, res.content, tabs[0].url, tabs[0].title, recipient);
    });
  });
}

function setPopupRecipients() {
  browser.storage.sync.get([ 'recipients' ]).then(function(res) {
    var ul = document.querySelector("#recipients");
    for (var i = 0; i < res.recipients.length; i++) {
      var node = document.createElement('button');
      var nodeText = document.createTextNode(res.recipients[i]);
      node.appendChild(nodeText);
      ul.appendChild(node);
    }
    ul.addEventListener('click', openMailWithRecipient, false);
  });
}

setPopupRecipients();
