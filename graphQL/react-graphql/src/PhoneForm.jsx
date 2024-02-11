import { useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import { EDIT_PHONE_NUMBER } from './persons/graphql-mutations'

const PhoneForm = ({ notifyError }) => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')

    const [editPhone, result] = useMutation(EDIT_PHONE_NUMBER)

    useEffect(() => {
        if (result.data && result.data.editPhoneNumber === null) {
            console.error('Person not found')
            notifyError('Person not found')
        }
    }, [result.data])

    const handleSubmit = event => {
        event.preventDefault()

        editPhone({ variables: { name, phone } })

        setName('')
        setPhone('')
    }

    return (
        <div>
            <h2>Edit Phone Number</h2>

            <form onSubmit={handleSubmit}>
                <input placeholder={'Name'} value={name} onChange={event => {setName(event.target.value)}}/>
                <input placeholder={'Phone'} value={phone} onChange={event => {setPhone(event.target.value)}}/>
                <button>Save Changes</button>
            </form>
        </div>
    )
}

export default PhoneForm