import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

const getAllNotes = async () => {
    const res = await axios.get(baseUrl)
    return res.data //notes
}

const createNewNote = async (content) => {
    const note = {content, important: false}
    const response = await axios.post(baseUrl, note)
    const {data} = response
    return data
}

const toggleImportanceOfNote = async note => {
    note.important = !note.important
    const editedNote = editNote(note)
    return editedNote
}

const editNote = async (note) => {
    const response = await axios.put(`${baseUrl}/${note.id}`, note)
    const {data} = response
    return data
}

const noteService = {getAllNotes, createNewNote, editNote, toggleImportanceOfNote}

export default noteService