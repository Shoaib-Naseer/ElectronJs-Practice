let fs = require('fs');
let filename = 'contacts';
let sno = 0;
const btn = document.getElementById('add-to-list');
const name = document.getElementById('Name');
const email = document.getElementById('Email');
const contactTable = document.getElementById('contact-table');

btn.addEventListener('click', function () {
  let newname = name.value;
  let newemail = email.value;
  fs.appendFile('contacts', newname + ',' + newemail + '\n');
  addEntry(name, email);
});

function addEntry(name, email) {
  if (name && email) {
    sno++;
    let updateString =
      '<tr><td>' +
      sno +
      '</td><td>' +
      name +
      '</td><td>' +
      email +
      '</td></tr>';

    contactTable.append(updateString);
  }
}

function loadAndDisplayContacts() {
  //Check if file exists
  if (fs.existsSync(filename)) {
    let data = fs.readFileSync(filename, 'utf8').split('\n');

    data.forEach((contact, index) => {
      let [name, email] = contact.split(',');
      addEntry(name, email);
    });
  } else {
    console.log("File Doesn't Exist. Creating new file.");
    fs.writeFile(filename, '', (err) => {
      if (err) console.log(err);
    });
  }
}

loadAndDisplayContacts();
