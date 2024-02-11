import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { CREATE_PERSON } from './persons/graphql-mutations'

const PersonForm = ({ notifyError }) => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')

    const [ createPerson ] = useMutation(CREATE_PERSON, {
        onError: error => {
            notifyError(error.graphQLErrors[0].message)
        }
    })

    const handleSubmit = event => {
        event.preventDefault()

        createPerson({ variables: { name, phone, street, city } })

        setName('')
        setPhone('')
        setStreet('')
        setCity('')
    }

    return (
        <div>
            <h2>Create a new Person</h2>

            <form onSubmit={handleSubmit}>
                <input placeholder={'Name'} value={name} onChange={event => {setName(event.target.value)}}/>
                <input placeholder={'Phone'} value={phone} onChange={event => {setPhone(event.target.value)}}/>
                <input placeholder={'Street'} value={street} onChange={event => {setStreet(event.target.value)}}/>
                <input placeholder={'City'} value={city} onChange={event => {setCity(event.target.value)}}/>
                <button>Save</button>
            </form>
        </div>
    )
}

export default PersonForm