import { useDispatch } from 'react-redux';
import { createNote } from '../reducers/noteReducer'

export default function NewNote () {
    const dispatch = useDispatch()
    
    const addNote = async (event) => {
        event.preventDefault()
        const { target } = event
  
        const content = target.note.value
        target.note.value = ''
  
        try{
            dispatch(createNote(content))
        }catch (err) {
            console.error(err)
        }
    }
    
    return (
        <form onSubmit={addNote}>
            <input name='note' />
            <button>add</button>
        </form>
    )
}