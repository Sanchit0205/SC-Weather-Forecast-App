const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const cityInput = document.querySelector('.search-box input');


// Preload images
const preloadImages = () => {
    const imageUrls = [
        '/Images/clear.png',
        '/Images/rain.png',
        '/Images/snow.png',
        '/Images/cloud.png',
        '/Images/Haze.png',
        '/Images/mist.png',
        '/Images/thunderstorm.png', 
        '/Images/background1.jpg',
        '/Images/rain.jpg',
        '/Images/snow.jpg',
        '/Images/240_F_747169629_Z51nHt57EndryEjdLgDTCAqDziyrQrna.jpg',
        '/Images/Haze.jpg',
        '/Images/mist.jpg',
        '/Images/thunderstorm.jpg'
    ];

    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
};

// Call the preload function
preloadImages();

search.addEventListener('click', () => {
    const APIKey = '98740f4ebc0d63bc0f8ba70090e5a091';
    const city = document.querySelector('.search-box input').value;

    if (city === '') {
        weatherBox.style.opacity = 0;
        weatherDetails.style.opacity = 0;
        setTimeout(() => {
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
        }, 300);
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === "404") {
                throw new Error('Invalid city name');
            }

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = '/Images/clear.png';
                    document.body.style.backgroundImage = "url('/Images/background1.jpg')";
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
                case 'Thunderstorm':
                    image.src = '/Images/thunderstorm.png';
                    document.body.style.backgroundImage = "url('/Images/thunderstorm.jpg')";
                    break;
                default:
                    image.src = '/Images/clear.png';
                    document.body.style.backgroundImage = "url('/Images/background1.png')";
                    break;
            }

            temperature.innerHTML = `${Math.round(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${json.wind.speed} Km/h`;

            // Remove error message if present
            const errorMessage = document.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }

            // Display weather data with smooth transition
            weatherBox.style.display = 'block';
            weatherBox.style.opacity = 1;
            weatherDetails.style.display = 'flex';
            weatherDetails.style.opacity = 1;
        })
        .catch(error => {
            // Hide weather data with smooth transition
            weatherBox.style.opacity = 0;
            weatherDetails.style.opacity = 0;

            // Wait for the transition to complete before setting display to 'none'
            setTimeout(() => {
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
            }, 300);

            // Display error message
            let errorMessage = document.querySelector('.error-message');
            if (!errorMessage) {
                errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.style.color = 'red';
                errorMessage.style.marginTop = '10px';
                container.appendChild(errorMessage);
            }
            errorMessage.textContent = error.message;
        });
});

cityInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        search.click();
    }
});
