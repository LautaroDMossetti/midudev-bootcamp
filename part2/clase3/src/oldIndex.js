import { StrictMode } from "react";
import { useState } from "react";
import { createRoot } from "react-dom/client";

const Counter = ({number}) => {
  //console.log("Counter render")
  return <h1>{number}</h1>
}

const App = (props) => {
  const [contadorValue, updateContador] = useState(0);
  
  /* igual que lo de arriba
  const contador = useState(13);
  const contadorValue = contador[0];
  const updateContador = contador[1];
  */

  /*
  setInterval(() => {
    updateContador(contadorValue + 1)
  }, 2000)
  */

  //console.log("render")

  const handleClick = () => {
    updateContador(contadorValue + 1)
  }

  const handleClickReset = () => {
    updateContador(0)
  }

  const isEven = contadorValue % 2 === 0

  return (
    <div>
      <p>El valor del contador es:</p>
      <Counter number={contadorValue} />
      <p>{isEven ? "Es par" : "Es impar"}</p>
      <button 
      
      /*onClick={() => {
        updateContador(contadorValue + 1)
        /*updateContador(prevContador => {
          return prevContador + 1
        })*/
      //}}

      onClick={handleClick}
      >
        Incrementar
      </button>
      <button
        onClick={handleClickReset}
      >
        Reset
      </button>
    </div>);
};

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
