import React, { useState } from 'react'
import ReactDOM from 'react-dom'

//EJERCICIOS 1.6 A 1.14

const WarningNoStatistics = () => <h3>No feedback given</h3>

/*
const Statistics = ({good, neutral, bad}) => {
  return (
    <div>
      <h3>statistics</h3>
      <div>
        <p>good: {good}</p>
        <p>neutral: {neutral}</p>
        <p>bad: {bad}</p>
        <p>all: {good + neutral + bad}</p>
        <p>average: {(good - bad) / (good + neutral + bad)}</p>
        <p>positive: {(good * 100) / (good + neutral + bad)}</p>
      </div>
    </div>
  )
}*/

const Statistics = ({good, neutral, bad}) => {
  return (
    <div>
      <h3>statistics</h3>
      <div>
        <table>
          <tbody>
            <tr>
              <td>good:</td>
              <td>{good}</td>
            </tr>
            <tr>
              <td>neutral:</td>
              <td>{neutral}</td>
            </tr>
            <tr>
              <td>bad:</td>
              <td>{bad}</td>
            </tr>
            <tr>
              <td>all:</td>
              <td>{good + neutral + bad}</td>
            </tr>
            <tr>
              <td>average:</td>
              <td>{(good - bad) / (good + neutral + bad)}</td>
            </tr>
            <tr>
              <td>positive:</td>
              <td>{(good * 100) / (good + neutral + bad)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClickNeutral = () => {
    setNeutral(neutral + 1)
  }

  return (
    <div>
      <h2>Give Feedback</h2>
      <button onClick={() => setGood(good + 1)}>Good</button>
      <button onClick={handleClickNeutral}>Neutral</button>
      <button onClick={() => setBad(prevBad => {return prevBad + 1})}>Bad</button>
      {(good + neutral + bad) === 0 ? <WarningNoStatistics /> : <Statistics good={good} neutral={neutral} bad={bad}/>}
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)