const express = require('express');
const app = express();

//Route setup
app.use(express.static(__dirname + '/dist'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

module.exports = app;
