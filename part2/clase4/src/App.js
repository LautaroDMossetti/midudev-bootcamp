import './App.css';
import {Note} from './Note.js'
import {useState} from 'react'

//console.log(getNumber()) //2

//const notes = undefined

//const notes = []

/*
const Note = ({note}) => {
  return (
    <li key={note.id}>
      <p>{note.content}</p>
      <small>
        <time>{note.date}</time>
      </small>
    </li>
  )
}
*/

function App(props) {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  
  /*
  if (typeof notes === "undefined" || notes.length === 0) {
    return "no tenemos notas que mostrar"
  }
  */

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('crear nota')
    console.log(newNote)
    const noteToAddToState = {
      id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5
    }
    console.log(noteToAddToState)

    setNotes(notes.concat(noteToAddToState))
    setNewNote('')

    /*
    {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true,
    }
    */
  }

  const handleShowAll = () => {
    setShowAll(() => !showAll)
  }

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={handleShowAll} >{showAll ? "Show only important" : "Show all"}</button>
      <ol>
        {notes.filter(note => {
          if (showAll === true) return true;
          return note.important === true;
        })
        .map(note => <Note key={note.id} content={note.content} date={note.date} />)}
      </ol>

      <form onSubmit={handleSubmit}>
        <input type='text' onChange={handleChange} value={newNote} />
        <button>Crear Nota</button>
      </form>
    </div>
  );
}

/*
<ol>
  {notes.map(note => <Note key={note.id} {...note} />)} <--- Medio mala practica
</ol>
*/

/*
<ol>
  {notes.map(note => <Note note={note} />)}
</ol>
*/

/*
return (
    <div>
      {notes.map(note => <div key={note.id}>
        <p>{note.content}</p>
        <small>
          <time>{note.date}</time>
        </small>
      </div>)}
    </div>
  );
*/

//<h1>Clase 4 del Bootcamp</h1>

export default App;
