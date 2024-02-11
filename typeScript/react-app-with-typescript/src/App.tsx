import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import List from './components/List'
import Form from './components/Form'
import { Sub, SubsFromApi } from './types'
import axios from 'axios'

interface AppState {
  subs: Array<Sub>
}

function App() {
  const [subs, setSubs] = useState<AppState['subs']>([])
  const divRef = useRef<HTMLDivElement>(null)

  const fetchSubs = (): Promise<SubsFromApi> => {
    return axios.get('http://localhost:3002/subs').then(response => response.data)
  }

  const mapFromApiToSubs = (apiResponse : SubsFromApi): Array<Sub> => {
    return apiResponse.map(subFromApi => {
      const {
        nick,
        months: subMonths,
        profileUrl: avatar,
        description
      } = subFromApi

      return {
        nick,
        subMonths,
        avatar,
        description
      }
    })
  }

  useEffect(() => {
    fetchSubs().then(res => mapFromApiToSubs(res)).then(mappedSubs => setSubs(mappedSubs))
  }, [])

  const handleNewSub = (newSub: Sub): void => {
    setSubs(subs => ([ ...subs, newSub]))
  }

  return (
    <div className="App" ref={divRef}>
      <h1>midu subs</h1>
      <Form onNewSub={handleNewSub}/>
      <List subs={subs} />
    </div>
  );
}

export default App;
