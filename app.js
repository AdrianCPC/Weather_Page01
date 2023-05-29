const form = document.getElementById("location-form");
const weatherInfo = document.getElementById("weather-info");


form.addEventListener('submit', function (event) {
    event.preventDefault();
    const locationInput = document.getElementById('location-input');
    const location = locationInput.value;


  // Make API request
  fetch(`https://api.weather.com/your-api-endpoint?location=${location}&apikey=your-api-key`)
    .then(response => response.json())
    .then(data => {
      // Process API response and display weather information
      displayWeather(data);
    })
    .catch(error => {
      // Display error message if API request fails
      weatherInfo.innerHTML = `<p class="error-message">Error retrieving weather data. Please try again later.</p>`;
    });
});



function displayWeather(data) {
    // Extract relevant data from the API response and display it on the page
    const temperature = data.main.temp;
    const description = data.weather[0].description;
  
    weatherInfo.innerHTML = `
      <p>Temperature: ${temperature}°C</p>
      <p>Description: ${description}</p>
    `;
  }