const cityForm = document.querySelector('form');
const details = document.querySelector('.details');
const card = document.querySelector('.card');
const time = document.querySelector('.time');
const icon = document.querySelector('.icon img');


//buliding a f which is called by .then later

const updateUI= (data) => {

    //adding city and weather details
    const {cityDetails, cityWeather} = data;
    const html1 = `
                
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${cityWeather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${cityWeather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
    
    `

    details.innerHTML = html1;


    //canceling the d-none class
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
    console.log(data);


    //changint the picture using Ternary operator
    let timeSrc = cityWeather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('src', timeSrc);


    //changing the icon
    let iconSrc = `img/icons/${cityWeather.WeatherIcon}.svg`
    icon.setAttribute('src', iconSrc);




};



//building another async f to call the async fs in forcast.js... 
//then we call this new f that has the city info. in our event listener.
const updateCity = async (city) => {

    const cityDetails = await getCity(city);
    const cityWeather = await getWeather(cityDetails.Key);

    return {cityDetails, cityWeather};

};



cityForm.addEventListener('submit', (e) => {

    //prevent refreshing
    e.preventDefault();

    // get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // update the UI with new city
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

    localStorage.setItem('city', city );
});

if(localStorage.getItem('city')){
    updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}


