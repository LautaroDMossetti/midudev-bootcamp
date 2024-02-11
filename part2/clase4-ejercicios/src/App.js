import React, { useState } from 'react'

//EJERCICIOS 2.6 A 2.10

const ListOfPersons = ({persons, filter}) => {
    return (
        <div>
            <ul>
                {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
                .map(person => {
                    return (
                        <li key={person.name}>
                            {person.name} {person.number}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

const App = () => {

    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])
    const [newName, setNewName ] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        
        if(!persons.some(person => person.name === newName) && !persons.some(person => person.number === newNumber)){
            const newNameToAddToState = {name: newName, number: newNumber}
        
            setPersons(persons.concat(newNameToAddToState))
        }
        else{
            window.alert('Nombre o numero ya esta tomado')
        }
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    return (
        <div>
        <h2>Phonebook</h2>
        <input type='text' onChange={handleFilterChange} value={filter} />
        <h2>Add new number</h2>
        <form onSubmit={handleSubmit}>
            <div>
            name: <input type='text' onChange={handleNameChange} value={newName}/>
            number: <input type='text' onChange={handleNumberChange} value={newNumber} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
        <h2>Numbers</h2>
        <ListOfPersons persons={persons} filter={filter} />
        </div>
    )
}

export default App