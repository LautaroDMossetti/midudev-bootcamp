import reactLogo from './assets/react.svg'
import './App.css'
import { usePersons } from './persons/custom-hooks'
import { useState } from 'react'
import Persons from './Persons'
import PersonForm from './PersonForm'
import Notify from './Notify'
import PhoneForm from './PhoneForm'
import LoginForm from './LoginForm'
import { ALL_PERSONS } from './persons/graphql-queries'
import { useApolloClient, useSubscription } from '@apollo/client'
import { PERSON_ADDED } from './persons/graphql-subscriptions'

function App() {
  const {data, error, loading} = usePersons()
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('phonenumbers-user-token'))

  const client = useApolloClient()

  useSubscription(PERSON_ADDED, {
    onSubscriptionData: ({subscriptionData}) => {
      console.log('person added')
      client.cache.updateQuery({ query: ALL_PERSONS }, ({ allPersons }) => {
        return {
            allPersons: allPersons.concat(subscriptionData.data.personAdded)
        }
    })
    }
  })

  if(error) return <span style='color: red'>{error}</span>

  const notifyError = message => {
    setErrorMessage(message)
    setTimeout(() => {setErrorMessage(null)}, 5000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div className="App">
        <Notify errorMessage={errorMessage} />

        <img src={reactLogo} className="logo react" alt="React logo" />
        {
          loading
            ? <p>Loading ...</p>
            : <Persons persons={data?.allPersons}/>
        }
        {token ? 
          <button onClick={logout}>Logout</button>
        : <LoginForm notifyError={notifyError} setToken={setToken} />
        }
        <PhoneForm notifyError={notifyError} />
        <PersonForm notifyError={notifyError} />
    </div>
  )
}

export default App
