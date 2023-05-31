const apiKey = 'eb872b15487e47a7872b15487e97a7e4';
const stationId = 'IMOCOA1';
const apiUrl = `https://api.weather.com/v2/pws/observations/current?stationId=${stationId}&format=json&units=m&apiKey=${apiKey}`;


// Función para convertir grados en puntos cardinales
function degreesToCardinal(degrees) {
    const cardinals = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5);
    return cardinals[(index % 16)];
  }

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    // Extraer los datos de la estación meteorológica
    const observation = data.observations[0];
    const temperature = observation.metric.temp;
    const humidity = observation.humidity;
    const windSpeed = observation.metric.windSpeed;
    const windDirectionDegrees = observation.winddir;
    const windDirectionCardinal = degreesToCardinal(windDirectionDegrees);
    //const gust = observation.metric.gust !== undefined ? observation.metric.gust : 'N/A';
    const pressure = observation.metric.pressure;
    const precipitationRate = observation.metric.precipRate;
    const precipitationTotal = observation.metric.precipTotal;
    const uvIndex = observation.uv;
    const solarRadiation = observation.solarRadiation;
    const feelsLike = observation.metric.heatIndex;

    // Actualizar el contenido de los paneles con los datos de la API
    document.getElementById('temperature').textContent = `Temperature: ${temperature}°C`;
    document.getElementById('feels-like').textContent = `Feels Like: ${feelsLike}°C`;
    document.getElementById('humidity').textContent = `Humidity: ${humidity}%`;
    document.getElementById('wind-speed').textContent = `Wind Speed: ${windSpeed} km/h`;
    document.getElementById('wind-direction').textContent = `Wind Direction: ${windDirectionCardinal}`;
    document.getElementById('pressure').textContent = `Pressure: ${pressure} hPa`;
    document.getElementById('precipitation-rate').textContent = `Precipitation Rate: ${precipitationRate} mm/hr`;
    document.getElementById('precipitation-total').textContent = `Precipitation Total: ${precipitationTotal} mm`;
    document.getElementById('uv-index').textContent = `UV Index: ${uvIndex}`;
    document.getElementById('solar-radiation').textContent = `Solar Radiation: ${solarRadiation} W/m²`;
    // Mostrar los datos en la página
    //const weatherInfo = document.getElementById('weather-info');
    //weatherInfo.innerHTML = `
      //<p>Temperature: ${temperature}°C</p>
      //<p>Feels Like: ${feelsLike}°C</p>
      //<p>Humidity: ${humidity}%</p>
      //<p>Wind Speed: ${windSpeed} km/h</p>
      //<p>Wind Direction: ${windDirectionCardinal}</p>
      //<p>Gust: ${gust} km/h</p>
      //<p>Pressure: ${pressure} hPa</p>
      //<p>Precipitation Rate: ${precipitationRate} mm/hr</p>
      //<p>Precipitation Total: ${precipitationTotal} mm</p>
      //<p>UV Index: ${uvIndex}</p>
      //<p>Solar Radiation: ${solarRadiation} W/m²</p>

    //`;
  })
  .catch(error => {
    console.log('Error:', error);
  });
