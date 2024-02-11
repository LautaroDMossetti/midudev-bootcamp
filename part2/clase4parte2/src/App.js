import './App.css';
import {Note} from './Note.js'
import {useEffect, useState} from 'react'
import { getAllNotes } from './services/notes/getAllNotes';
import { createNote } from './services/notes/createNote';

function App() {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    console.log('useEffect')
    setLoading(true)
    console.log('timeout')
    
    getAllNotes().then(notes => {
      setNotes(notes)
      setLoading(false)
    })
  }, [])

  /*
  useEffect(() => {
    console.log('useEffect')
    setLoading(true)

    setTimeout(() => {
      console.log('timeout')
      fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => response.json())
      .then(json => {
        console.log('seteando notas de API')
        setNotes(json)
        setLoading(false)
      })
    }, 2000)
  }, [])
  */

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    console.log('crear nota')

    /*
    const noteToAddToState = {
      id: notes.length + 1,
      title: newNote,
      body: newNote
    }
    */

    const noteToAddToState = {
      title: newNote,
      body: newNote,
      userId: 1
    }

    setError('')

    createNote(noteToAddToState)
    .then(newNote => {
      setNotes(prevNotes => prevNotes.concat(newNote))
    }).catch(e => {
      console.error(e)
      setError('la API ha petado')
    })

    //setNotes(notes.concat(noteToAddToState))
    setNewNote('')
  }

  console.log('render')
  //if (notes.length === 0) return "Aun no hay notas para mostrar"

  return (
    <div>
      <h1>Notes</h1>
      {loading ? "Cargando..." : ""}

      <ol>
        {notes.map(note => <Note key={note.id} {...note} />)}
      </ol>

      <form onSubmit={handleSubmit}>
        <input type='text' onChange={handleChange} value={newNote} />
        <button>Crear Nota</button>
      </form>

      {error ? <span>{error}</span> : ''}
    </div>
  );
}

export default App;
