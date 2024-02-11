import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from './users/graphql-mutations'

const LoginForm = ({notifyError, setToken}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [login, result] = useMutation(LOGIN, {
        onError: error => {
            notifyError(error.graphQLErrors[0].message)
        }
    })

    useEffect(() => {
        if(result.data) {
            const {value: token} = result.data.login
            setToken(token)
            localStorage.setItem('phonenumbers-user-token', token)
        }
    }, [result.data])

    const handleSubmit = event => {
        event.preventDefault()

        login({ variables: { username, password } })

        setUsername('')
        setPassword('')
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    Username <input value={username} type='text' onChange={({target}) => setUsername(target.value)} />
                </div>
                <div>
                    Password <input value={password} type='password' onChange={({target}) => setPassword(target.value)} />
                </div>
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default LoginForm