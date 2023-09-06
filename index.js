document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector(".container");
    const search = document.querySelector(".search-box");
    const weatherBox = document.querySelector(".weather-box");
    const weatherDetails = document.querySelector(".weather-details");
    const error404 = document.querySelector(".not-found");
  
    search.addEventListener('click', async () => {
      const APIKey = '9a0224a710447650a507915a57b9898c'
      const city = document.querySelector('.search-box input').value;
  
      if (city === '') {
        return;
      }
  
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`);
        if (!response.ok) {
          throw new Error('City not found');
        }
  
        const json = await response.json();
  
        error404.style.display = 'none';
        error404.classList.add('fadeIn');
  
        const image = document.querySelector('.weather-box img');
        const temparature = document.querySelector('.weather-box .temparature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');
  
        switch (json.weather[0].main) {
          case 'Clear':
            image.src = './images/clear.jpg';
            break;
          case 'Rain':
            image.src = './images/rain.jpg';
            break;
          case 'Snow':
            image.src = './images/snow.jpg';
            break;
          case 'Clouds':
            image.src = './images/cloud.jpg';
            break;
          case 'Haze':
            image.src = './images/haze.jpg';
            break;
          default:
            image.src = "";
        }
        temparature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity} %`;
        wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;
  
        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '590px';
      } catch (error) {
        // Handle errors here, e.g., display an error message
        console.error('An error occurred:', error);
      }
    });
  });
  