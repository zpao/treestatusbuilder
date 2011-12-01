const STATUSES = {
  "OPEN": { color: "green" },
  "CLOSED": { color: "red" },
  "APPROVAL REQUIRED": { color: "yellow" }
}
// multiline strings in JS are messy, so pull this from a hidden input onload
var messageTemplate;

window.addEventListener("load", setup, false);

function setup() {
  window.removeEventListener("load", setup, false);

  messageTemplate = document.getElementById("messagetemplate").value;
  // alert("foo");
  // setupTreeStatus();

  var form = document.getElementById("statusbuilder");
  form.addEventListener("change", updateStatusMessage, false);
  form.addEventListener("input", updateStatusMessage, false);

  // show the message on load
  updateStatusMessage();
}

function updateStatusMessage() {
  var treestatus = document.getElementsByName("treestatus");
  var status;
  for (var i in treestatus) {
    if (treestatus[i].checked)
      status = treestatus[i].value;
  }

  if (!status) {
    alert("Is the tree open? Select a status.");
  }

  var color = STATUSES[status].color;
  var after = document.getElementById("aftermessage").value

  // make sure there's a period or space to follow the status
  if (after.length) {
    if (after[0] != "." && after[0] != " ")
      after = " " + after;
    if (after[after.length - 1] != " ")
      after = after + " ";
  }
  else {
    after = ". ";
  }

  var data = {
    status: status,
    color: color,
    after: after
  }

  document.getElementById("statusmessage").value = t(messageTemplate, data);
}

/*****************************************************************************/

// shortest templating ever
// via http://mir.aculo.us/2011/03/09/little-helpers-a-tweet-sized-javascript-templating-engine/
// then added bug # linking
function t(s,d){
  for (var p in d)
    s = s.replace(new RegExp('{' + p + '}', 'g'), d[p]);
  s = s.replace(/bug (\d+)/g, '<a href="https://bugzilla.mozilla.org/show_bug.cgi?id=$1">bug $1</a>');
  return s;
}
