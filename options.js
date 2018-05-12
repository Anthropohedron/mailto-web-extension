var defaultSubject = "FYI: {title}";
var defaultContent = "Interesting: {url}";

function saveOptions(e) {
  browser.storage.sync.set({
    subject: document.querySelector("#subject").value,
    content: document.querySelector("#content").value
  });
  e.preventDefault();
}

function restoreOptions() {
  browser.storage.sync.get([ 'subject', 'content' ]).then((res) => {
    document.querySelector("#subject").value = res.subject || defaultSubject;
    document.querySelector("#content").value = res.content || defaultContent;
  }, console.log);
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
restoreOptions();
