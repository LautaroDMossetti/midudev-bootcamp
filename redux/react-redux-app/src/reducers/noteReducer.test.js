import deepFreeze from 'deep-freeze'
import { noteReducer } from './noteReducer'

describe('noteReducer', () => {
    test('returns new state after action with toggle_important', () => {
        const state = [
            {
                id: 1,
                content: 'note1',
                important: false
            },
            {
                id: 2,
                content: 'note2',
                important: false
            }
        ]

        const action = {
            type: '@notes/toggle_important',
            payload: {
                id: 2
            }
        }

        deepFreeze(state)
        const newState = noteReducer(state, action)

        expect(newState).toHaveLength(2)
        expect(newState).toContainEqual(state[0])
        expect(newState).toContainEqual({
            id: 2,
            content: 'note2',
            important: true
        })
    })
})