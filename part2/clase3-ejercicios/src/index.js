import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    
    const anecdotes = [
        'If it hurts, do it more often',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
    ]

    const [selected, setSelected] = useState({
        position: 0,
        votes: [0, 0, 0, 0, 0, 0]
    })

    const getRandomIntInclusive = (min, max) => {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min + 1) + min) //The maximum is inclusive and the minimum is inclusive
    }

    const handleClickVote = () => {
        setSelected(prevSelected => {
            return {
                ...selected,
                votes: prevSelected.votes.fill((prevSelected.votes[prevSelected.position] + 1),prevSelected.position,prevSelected.position + 1)
            }
        })
    }

    const handleClickNextAnecdote = () => {
        setSelected({
            ...selected,
            position: getRandomIntInclusive(0,5)
        })
    }

    return (
        <div>
        <p>{anecdotes[selected.position]}</p>
        <p>This anectode has {selected.votes[selected.position]} votes</p>
        <button onClick={handleClickNextAnecdote}>Next anecdote</button>
        <button onClick={handleClickVote}>Vote</button>
        </div>
    )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)