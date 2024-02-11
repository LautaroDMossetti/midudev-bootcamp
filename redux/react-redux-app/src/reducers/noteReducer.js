import noteService from '../services/noteService'

export const noteReducer = (state = [], action) => {
    switch (action.type) {
        case '@notes/init':
            return action.payload;
        case '@notes/created':
            return state.concat(action.payload);
        case '@notes/toggle_important':
            return state.map(note => {
                if (note.id === action.payload.id) {
                    return {
                        ...note,
                        important: !note.important
                    }
                }
                return note
            });
        default:
            return state;
    }
}

export const generateId = () => {
    return Math.floor(Math.random() * 999999999) + 1
}

export const createNote = newContent => {
    return async (dispatch) => {
        const note = await noteService.createNewNote(newContent)

        dispatch({
            type: '@notes/created',
            payload: note
        })
    }

}

export const toggleImportanceOf = note => {
    return async (dispatch) => {

        const editedNote = await noteService.toggleImportanceOfNote(note)

        dispatch({
            type: '@notes/toggle_important',
            payload: editedNote.id
        })
    }
}

export const initNotes = () => {
    return async (dispatch) => {
        const notes = await noteService.getAllNotes()

        dispatch ({
            type: '@notes/init',
            payload: notes
        })
    }
}