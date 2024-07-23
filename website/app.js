/* Global Variables */
// Personal API Key for OpenWeatherMap API
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=e90edb1a046b8d78d96247bab06c5bd2=imperial';
// Create a new date instance dynamically with JS
let newDate = new Date().toLocaleDateString();

// Event listener for the generate button
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
  const zip = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;
  getWeather(baseURL, zip, apiKey)
    .then(function(data) {
      // Add data to POST request
      postData('/add', { temp: data.main.temp, date: newDate, feel: feelings })
      // Function to update UI
      .then(() => updateUI());
    });
}

// Function to GET Web API Data
const getWeather = async (baseURL, zip, key) => {
  const res = await fetch(baseURL + zip + key);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
}

// Function to POST data
const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
}

// Function to GET Project Data
const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const allData = await request.json();
    document.getElementById('temp').innerHTML = Math.round(allData.temp) + ' degrees';
    document.getElementById('content').innerHTML = allData.feel;
    document.getElementById('date').innerHTML = allData.date;
  } catch (error) {
    console.log("error", error);
  }
}
