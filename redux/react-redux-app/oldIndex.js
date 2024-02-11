import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './src/reportWebVitals';
import { createStore } from "redux";

const actionIncremented = {
  type: "@counter/incremented"
}

const actionDecremented = {
  type: "@counter/decremented"
}

const actionReseted = {
  type: "@counter/reseted"
}

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case "@counter/incremented":
      return state + 1;
    case "@counter/decremented":
      return state - 1;
    case "@counter/reseted":
      return 0;
    default:
      return state;
  }
};

const store = createStore(
  counterReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  console.log(store.getState())
});

const App = () => {
  return (
    <div>
      <div>
        {store.getState()}
      </div>
      <button onClick={() => store.dispatch(actionIncremented)}> + </button>
      <button onClick={() => store.dispatch(actionDecremented)}> - </button>
      <button onClick={() => store.dispatch(actionReseted)}> reset </button>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));

const renderApp = () => {
  root.render(
    <App />
  );
}

renderApp()
store.subscribe(renderApp)




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
