
function launchWithTab(subject, content, recipients) {
  getThisTab().then(tabs => {
    var tab = tabs[0];
    launchUrl(subject, content, tab.url, tab.title,
      recipients);
  });
}

function openMailWithRecipient(e) {
  e.preventDefault();
  var checkboxes = document.querySelectorAll("#recipients input");
  var recipients = Array.prototype
    .filter.call(checkboxes, c => c.checked)
    .map(c => c.value.trim())
    .join(',');
  getPrefs().then(res => {
    launchWithTab(res.subject, res.content, recipients);
  });
}

function createCheckboxes(recipients) {
  var ul = document.querySelector("#recipients");
  recipients.forEach((recipient, i) => {
    var node = document.createElement("li");
    var id = "recip" + i;
    var subnode = document.createElement("input");
    subnode.setAttribute("name", "recipient");
    subnode.setAttribute("type", "checkbox");
    subnode.setAttribute("value", recipient);
    subnode.id = id;
    node.appendChild(subnode);
    subnode = document.createElement("label");
    subnode.setAttribute("for", id);
    subnode.innerText = recipient;
    node.appendChild(subnode);
    ul.appendChild(node);
  });
}

getPrefs().then(res => {
  if (!(res.recipients && res.recipients.length)) {
    launchWithTab(res.subject, res.content);
  }
  var form = document.querySelector("form");
  form.addEventListener('submit', openMailWithRecipient);
  createCheckboxes(res.recipients);
});

