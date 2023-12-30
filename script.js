window.addEventListener('load',()=>{
    console.log('it works!')
})

function getWeather(){
    let cityInput = document.getElementById('cityInput').value;

    if (cityInput === '') {
        alert('Please enter a city name');
        return;
    }

    const geoApiUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${cityInput}&count=1&language=en&format=json`

    axios.get(geoApiUrl)
    .then(
        response=>
        {
            result = response.data.results[0]
            console.log(result)

            let name = result.name
            let lat = result.latitude
            let lon = result.longitude

            const weatherApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,weather_code&timezone=Europe%2FCopenhagen`
    
            axios.get(weatherApiUrl)
            .then(
                response=>
                {
                    console.log(response)
                }
            )
        })
    .catch(
        err=>console.error(err)
    )

    
}