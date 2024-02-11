import axios from 'axios'
import React, { useEffect, useState } from 'react'

//EJERCICIOS 2.11 A 2.14

const ListOfCountries = ({countries, filter}) => {
    const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))

    if (filter) {
        if (filteredCountries.length > 20){
            return <p>too many matches, please specify</p>
        }
        else if (filteredCountries.length < 21 && filteredCountries.length > 1) {
            
            return (
                <ul>
                    {filteredCountries.map(country => {
                            return (
                                <li key={country.name.official}>
                                    {country.name.common}
                                </li>
                            )
                        })}
                </ul>
            )
        }
        else if (filteredCountries.length === 1) {
            return (
                <div>
                    <h2>{filteredCountries[0].name.common}</h2>
                    <p>Capital: {filteredCountries[0].capital}</p>
                    <p>Population: {filteredCountries[0].population}</p>
                    <ul>
                        <h3>Languages</h3>
                        {filteredCountries[0].languages ? Object.values(filteredCountries[0].languages).map(language => {
                            return (
                                <li key={language}>
                                    {language}
                                </li>
                            )
                        }) : 'unspecified'}
                        <h3>Flags</h3>
                        <img alt='flag' src={filteredCountries[0].flags.png} />
                    </ul>
                </div>
            )
        }
    }
}

const App = () => {
    const [filter, setFilter] = useState('')
    const [countries, setCountries] = useState([])

    useEffect(() => {
        console.log('solicitando API')

        axios.get('https://restcountries.com/v3.1/all')
        .then(response => {
            const {data} = response
            setCountries(data)
            console.log('API solicitada')
        })
    }, [])

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    return (
        <div>
            <p>find countries: <input type='text' onChange={handleFilterChange} value={filter} /></p>
            <ListOfCountries countries={countries} filter={filter} />
        </div>
    )
}

export default App
