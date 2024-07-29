
const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const cityInput = document.querySelector('.search-box input');



search.addEventListener('click', () => {
    const APIKey = '98740f4ebc0d63bc0f8ba70090e5a091';
    const city = document.querySelector('.search-box input').value;
    
    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`)
        .then(response => response.json())
        .then(json => {
            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = '/Images/clear.png';
                    document.body.style.backgroundImage = "url('/Images/240_F_823017121_nb9kE9UxuLNwvaZfrQKFMg8WexcJ1oJm.jpg')";
                    break;
                case 'Rain':
                    image.src = '/Images/rain.png';
                    document.body.style.backgroundImage = "url('/Images/rain.jpg')";
                    break;
                case 'Snow':
                    image.src = '/Images/snow.png';
                    document.body.style.backgroundImage = "url('/Images/snow.jpg')";
                    break;
                case 'Clouds':
                    image.src = '/Images/cloud.png';
                    document.body.style.backgroundImage = "url('/Images/240_F_747169629_Z51nHt57EndryEjdLgDTCAqDziyrQrna.jpg')";
                    break;
                case 'Haze':
                    image.src = '/Images/Haze.png';
                    document.body.style.backgroundImage = "url('/Images/Haze.jpg')";
                    break; 
                case 'Mist':
                    image.src = '/Images/mist.png';
                    document.body.style.backgroundImage = "url('/Images/mist.jpg')";
                    break;      

                default:
                    image.src = '/Images/clear.png';
                    document.body.style.backgroundImage = "url('/Images/abstract-background-with-smooth-waves-in-shades-of-black.png')";
                    break;
            }

            temperature.innerHTML = `${Math.round(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${json.wind.speed} Km/h`;
        })
        .catch(error => alert('Error fetching weather data: ' + error));


});


cityInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        search.click();
    }
}); 