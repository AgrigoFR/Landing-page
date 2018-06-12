'use strict';

const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
// Constants

const PORT = '8080';
const HOST = '0.0.0.0';

// App
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
})
.get('/succes', (req, res) => {
  res.sendFile(path.join(__dirname + '/succes.html'));
})
.get('/echec', (req, res) => {
  res.sendFile(path.join(__dirname + '/echec.html'));
})
.post('/email', (req, res) => {
  if (validateEmail(req.body.email)) {
    fs.appendFile('email.txt', '\n'+req.body.email, (err) => {
      if (err) throw err;
    });
    res.redirect('/succes');
  }
  else {
    res.redirect('/echec');
  }

});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
