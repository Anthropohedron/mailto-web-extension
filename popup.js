
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
  recipients.forEach((r, i) => {
    var node = document.createElement("li");
    var id = "recip" + i;
    var recipient = htmlEscape(r.trim());
    node.innerHTML = [
      '<input name="recipient" type="checkbox" id="',
      id,
      '" value="',
      recipient,
      '" /><label for="',
      id,
      '">',
      recipient,
      '</label>'
    ].join("");
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

