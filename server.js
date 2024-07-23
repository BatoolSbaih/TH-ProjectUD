// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
const server = app.listen(port, listening);

function listening() {
  console.log(`Server running on localhost: ${port}`);
}

// Get route
app.get('/all', sendData);
function sendData(req, res) {
  res.send(projectData);
}

// POST route to add data
app.post('/add', (req, res) => {
  projectData = {
    temp: req.body.temp,
    date: req.body.date,
    feel: req.body.feel,
  };
  res.send(projectData);
});
