export const filterReducer = (state = 'all', action) => {
    switch (action.type) {
        case '@filter/all':
            return 'all';
        case '@filter/important':
            return 'important';
        case '@filter/not important':
            return 'not important';
        default:
            return state
    }
}

export const filterNotes = filter => {
    return {
        type: `@filter/${filter}`
    }
}