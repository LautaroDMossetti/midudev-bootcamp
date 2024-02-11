import { useDispatch } from 'react-redux';
import { filterNotes } from '../reducers/filterReducer'

export default function VisibilityFilter () {
    const dispatch = useDispatch()

    const filterSelected = value => {
        dispatch(filterNotes(value))
    }

    return (
        <div>
            All
            <input type='radio' name='filter' onChange={() => filterSelected('all')}/>

            Important
            <input type='radio' name='filter' onChange={() => filterSelected('important')}/>

            Not Important
            <input type='radio' name='filter' onChange={() => filterSelected('not important')}/>
        </div>
    )
}