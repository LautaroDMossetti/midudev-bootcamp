import { StrictMode } from "react";
import { useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

const WarningNotUsed = () => {
  return <h1>Todavia no se ha usado el contador</h1>
}

const ListOfClicks = ({clicks}) => {
  //console.log({clicks});
  //debugger;
  return <p>{clicks.join(', ')}</p>
}

const INITIAL_COUNTER_STATE = {
  left: 2,
  right: 4,
  mensaje: "Mensdwadado"
}

const App = () => {

  //NO DEFINIR COMPONENTES DENTRO DE OTROS COMPONENTES
  //NUNCA UTILIZAR HOOKS DENTRO DE IFs, BUCLES O DENTRO DE UNA FUNCION QUE NO SEA COMPONENTE

  // Estados individuales
  //const [left, setLeft] = useState(0)
  //const [right, setRight] = useState(0)

  //Estado multiple (objeto), Dos estados con un solo hook, no recomendado pero posible
  /*
  const [counters, setCounters] = useState({
    left: 2,
    right: 4,
    //clicks: 0,
    mensaje: "Mensdwadado"
  })*/

  const [counters, setCounters] = useState(INITIAL_COUNTER_STATE)

  const [clicks, setClicks] = useState ([])

  /*
  const handleClickLeft = () => {
    setCounters({
      left: counters.left + 1,
      right: counters.right
    })
  }*/

  //Mismo que lo anterior
  //const handleClickLeft = (event) => {
  const handleClickLeft = () => {
    //event.preventDefault()
    //console.log(event)

    const newCountersState = {
      ...counters, // '...' es conocido como Spread Operator, esparcira (copiara) todas los elementos de un objeto dentro de otro
      left: counters.left + 1,
      //clicks: counters.clicks + 1
    }

    setCounters(newCountersState);
    setClicks(prevClicks =>{
      //return prevClicks.concat('L')
      return [...prevClicks, 'L']
    })
  }

  const handleClickRight = () => {
    setCounters({
      ...counters,
      right: counters.right + 1,
      //counters.right++  <---- Esto no se hace
      //clicks: counters.clicks + 1
    })

    setClicks(prevClicks => ([...prevClicks, 'R']))
  }

  const handleClickReset = () => {
    setCounters(INITIAL_COUNTER_STATE)

    setClicks([])
  }

  //Otra manera de contar el total de clicks a partir del array de derecha e izquierdas clickeadas
  //const left = clicks.filter(click => click === 'L')
  //const right = clicks.filter(click => click === 'R')

  /* Con estados individuales
  return (
    <div>
      {counters.left}
      <button onClick={() => setLeft(left + 1)}>Left</button>
      <button onClick={() => setRight(right + 1)}>Right</button>
      {counters.right}
    </div>
  )*/

  // Con un estado multiple
  return (
    <div>
      {counters.left}
      <button onClick={handleClickLeft}>Left</button>
      <button onClick={handleClickRight}>Right</button>
      {counters.right}
      <p>
        <button onClick={handleClickReset}>Reset</button>
      </p>
      <p>clicks totales: {clicks.length}</p>
      {clicks.length === 0 ? <WarningNotUsed /> : <ListOfClicks clicks={clicks} />}
    </div>
  )
};

//<a href="#" onClick={handleClickLeft}>Left</a>
//<a href="#" onClick={handleClickRight}>Right</a>
//{clicks.join(', ')}
//<p>{counters.mensaje}</p>

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
