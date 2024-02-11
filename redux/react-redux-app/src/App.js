import { useEffect } from 'react';
import './App.css';
import NewNote from './components/NewNote'
import NotesContainer from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter';
import { initNotes } from './reducers/noteReducer'
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initNotes())
  }, [dispatch])

  return (
      <div>
          <NewNote />
          <VisibilityFilter />
          <NotesContainer />
      </div>
  )
}

export default App;
