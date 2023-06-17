import React, {useEffect, useState} from 'react';
import axios from 'axios';


/**
 * description: "clear sky"
​​​
icon: "01d"
​​​
id: 800
​​​
main: "Clear"
 */
function Country({country, selectedCountriesCounter, onShow})
{
    const [weather, setWeather] = useState(null);
    useEffect(()=>{
        if (selectedCountriesCounter === 1)
        {
        console.log(process.env.REACT_APP_API_KEY)
        axios
        .get(
            `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0].toLowerCase()}&appid=${process.env.REACT_APP_API_KEY}`)
        .then(response => {
            setWeather(response.data);
        })
    }
    }, [selectedCountriesCounter, country]);

    // Rendering
    const renderLanguages = () => Object.entries(country.languages).map(language => <li key={language[0]}>{language[1]}</li>)
    const renderImage=  () => <img src={country.flags.png} alt='flag' />
    const renderCountryNameCaptialArea = () => <>
        <h2>{country.name.common}</h2>
        <p>Capital {country.capital[0]}</p>
        <p>Area {country.area}</p>
    </>

    const renderWeather = () => weather && (<div>
        <h3>Weather in {country.capital[0]}</h3>
        <p>temperature {weather.main.temp}</p>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='weather icon'/>
        <p>wind {weather.wind.speed} m/s</p>
    </div>)

    const renderCountryRestInformation = () => <>
        {renderCountryNameCaptialArea()}
        <h3>Languages:</h3>
        <ul>{renderLanguages()}</ul>
        {renderImage()}
        {renderWeather()}
    </>
    const renderCountryName = () => <p>{country.name.common} <button onClick={onShow}>show</button></p>
    const countryInformation =   selectedCountriesCounter > 1 ? renderCountryName() : renderCountryRestInformation()
    return <div>
        {countryInformation}
    </div>
}


export default Country;