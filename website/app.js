
/* Global Variables */
// Batool Sbaih
// MYPersonal API Key for OpenWeatherMap API
const weatherURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const api_key = '&appid=e90edb1a046b8d78d96247bab06c5bd2&units=imperial';

// Create a new date instance
let currentDate = new Date().toLocaleDateString();

// generate button
document.getElementById('generate').addEventListener('click', perform_action);

function perform_action(e) {
  const zip_code = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;
  getWeather(weatherURL, zip_code, api_key)
    .then(function(data) {

      post_data('/add', { temp: data.main.temp, date: currentDate, feel: feelings })
  
      .then(() => update_ui());
    });
}

// GET Web API Data
const getWeather = async (weatherURL, zip, key) => {
  try {
    const res = await fetch(`${weatherURL}${zip}${key}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};


//  GET Project Data
const update_ui = async () => {
  try {
    const response = await fetch('/all');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const allData = await response.json();
    
    document.getElementById('temp').textContent = `${Math.round(allData.temp)} degrees`;
    document.getElementById('content').textContent = allData.feel;
    document.getElementById('date').textContent = allData.date;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};


// Function to POST data
const post_data = async (url = '', data = {}) => {
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

