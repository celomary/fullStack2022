import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Country from './Country';


function App()
{
  const [countries, setCountries] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);


  useEffect(()=>{
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then(response => {
      setCountries(response.data);
    })
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.value.toLowerCase();
    const  foundCountries = countries.filter(country => country.name.common.toLowerCase().includes(value));
    setSelectedCountries(foundCountries);
  }

  const handleShowButton = (countryCommonName) => {
    return () => {
     countryCommonName = countryCommonName.toLowerCase();
     const  foundCountries = countries.filter(country => country.name.common.toLowerCase() === countryCommonName);
     setSelectedCountries(foundCountries);
    }
  }
  const renderSelectedCountries = () => selectedCountries.map(country => <Country 
  key={country.name.common} 
  country={country} 
  selectedCountriesCounter={selectedCountries.length}
  onShow={handleShowButton(country.name.common)}
  />);

  const listCountries = (selectedCountries.length > 10) ? 
      <p>Too many matches, specify another filter</p> 
        : renderSelectedCountries() 

  return <div>
  <div>
    <label>find countries</label>
    <input defaultValue="" onChange={handleInputChange} />
    {listCountries}
  </div>
  </div>
}

export default App;