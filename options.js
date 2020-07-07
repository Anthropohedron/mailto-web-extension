function saveOptions(e) {
  var recipients =
    document.querySelector("#recipients").value.trim();
  var recipList = recipients ?
    recipients.split("\n").map(r => r.trim()) :
    [];
  browser.storage.sync.set({
    subject: document.querySelector("#subject").value,
    content: document.querySelector("#content").value,
    recipients: recipList
  });
  e.preventDefault();
}

function restoreOptions() {
  browser.storage.sync.get([ 'subject', 'content', 'recipients' ]).then((res) => {
    document.querySelector("#subject").value = res.subject || defaultSubject;
    document.querySelector("#content").value = res.content || defaultContent;
    document.querySelector("#recipients").value = (
      res.recipients ? res.recipients.join("\n") : ''
    );
  }, console.log);
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
restoreOptions();
