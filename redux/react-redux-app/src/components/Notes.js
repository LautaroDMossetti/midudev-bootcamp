import { useDispatch, useSelector } from 'react-redux';
import { toggleImportanceOf } from '../reducers/noteReducer'

export default function NotesContainer () {
    const notes = useSelector(state => state.notes)
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()

    const toggleImportant = note => {
        dispatch(toggleImportanceOf(note))
    }

    return <Notes notes={notes} toggleImportant={toggleImportant} filter={filter} />
}

function Notes ({notes, toggleImportant, filter}) {
    let filteredNotes = notes

    if (filter !== 'all') {
        if (filter === 'important') {
            filteredNotes = filteredNotes.filter(note => note.important === true)
        }
        else if (filter === 'not important') {
            filteredNotes = filteredNotes.filter(note => note.important === false)
        }
        
    }

    return (
        <ul>
            {
                filteredNotes.map(note => {
                    return (
                        <Note note={note} key={note.id} toggleImportant={toggleImportant} />
                    )
                })
            }
        </ul>
    )
}

const Note = ({note, toggleImportant}) => {
    return(
        <li>
            {note.content}
            <strong onClick={() => {toggleImportant(note)}} > ({note.important ? 'important' : 'not important'}) </strong>
        </li>
    )
}