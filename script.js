window.addEventListener('load',()=>{
    console.log('it works!')
})

async function getWeather(){
    let cityInput = document.getElementById('cityInput').value;

    if (cityInput === '') {
        alert('Please enter a city name');
        return;
    }

    const geoApiUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${cityInput}&count=1&language=en&format=json`

    try {
        const response = await axios.get(geoApiUrl)
        result = response.data.results[0]
        //console.log(result)

        let cityName = result.name
        let lat = result.latitude
        let lon = result.longitude

        const weatherApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,weather_code&timezone=Europe%2FCopenhagen`
        
        try {
            const response = await axios.get(weatherApiUrl)
            result = response.data.current
            //console.log(result)
            
            let weather = 'unknown'
            if ([0,1].includes(result.weather_code)){
                weather = 'sunny'
            }
            if ([2,3,45,48].includes(result.weather_code)){
                weather = 'clouded'
            }
            if ([51,53,55,56,57,61,63,65,66,67,80,81,82].includes(result.weather_code)){
                weather = 'rainy'
            }
            if ([71,73,75,77,85,86].includes(result.weather_code)){
                weather = 'showy'
            }
            if ([95,96,99].includes(result.weather_code)){
                weather = 'thunderstorm'
            }

            
            let currentTemp = result.temperature_2m
            let feelsLikeTemp = result.apparent_temperature
           
            document.getElementById('city-name').innerText = cityName 
            document.getElementById('weather-code').innerText = weather
            document.getElementById('current-temp').innerText = currentTemp;
            document.getElementById('feels-like-temp').innerText = feelsLikeTemp
            document.getElementById('current-time').innerText = moment(result.time).format('Do MMMM YYYY, HH:mm');
            
        } catch (err) {
            console.error(err)
        }

    } catch(err) {
        console.error(err)
    }
}