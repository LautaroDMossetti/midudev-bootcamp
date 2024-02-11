import React from 'react'
import ReactDOM from 'react-dom'


// EJERCICIOS 1.1-1.2 =>

/**
const Header = (props) => {
  //console.log(props)
  return <h1>{props.course}</h1>
}

/* Otra forma de hacer la funcion anterior
const Header = (props) => {
  const {course} = props
  return <h1>{course}</h1>
}
*/

/* Otra forma de hacer la funcion anterior
const Header = ({course}) => <h1>{course}</h1>
*/

/*
const Content = (props) => {
  //console.log(props)
  return <p>{props.part} {props.exercises}</p>
}

/* Otra forma de hacer la funcion anterior
const Content = (props) => {
  const {part} = props
  const {exercises} = props
  return <p>{part} {exercises}</p>
}
*/

/* Otra forma de hacer la funcion anterior
const Content = ({part, exercises}) => {
  return <p>{part} {exercises}</p>
}
*/

/*
const Part = ({part, exercises}) => {
  return <p>{part} {exercises}</p>
}
*/

/*
const Content = ({part1, exercises1, part2, exercises2, part3, exercises3}) => {
  return (<div>
    <Part part={part1} exercises={exercises1}/>
    <Part part={part2} exercises={exercises2}/>
    <Part part={part3} exercises={exercises3}/>
  </div>)
}
*/

/*
const Total = ({sum}) => {
  return <p>Number of exercises {sum}</p>
}

/*
const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content part={part1} exercises={exercises1}/>
      <Content part={part2} exercises={exercises2}/>
      <Content part={part3} exercises={exercises3}/>
      <Total sum={(exercises1 + exercises2 + exercises3)}/>
    </div>
  )

  /*
  return (
    <div>
      <Header course={course} />
      <Content part1={part1} exercises1={exercises1} part2={part2} exercises2={exercises2} part3={part3} exercises3={exercises3}/>
      <Total sum={(exercises1 + exercises2 + exercises3)}/>
    </div>
  )
  */
//}*/

//EJERCICIO 1.3

/*

const Header = (props) => {
  //console.log(props)
  return <h1>{props.course}</h1>
}

const Content = (props) => {
  //console.log(props)
  return <p>{props.part.name} {props.part.exercises}</p>
}

const Total = ({sum}) => {
  return <p>Number of exercises {sum}</p>
}

/*
const Total = ({part1, part2, part3}) => {
  return <p>Number of exercises {part1.exercises + part2.exercises + part3.exercises}</p>
}
*/

/*
const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content part={part1}/>
      <Content part={part2}/>
      <Content part={part3}/>
      <Total sum={(part1.exercises + part2.exercises + part3.exercises)}/>
    </div>
  )

  /*
  return (
    <div>
      <Header course={course} />
      <Content part={part1}/>
      <Content part={part2}/>
      <Content part={part3}/>
      <Total part1={part1} part2={part2} part3={part3}/>
    </div>
  )
  */
//}

//EJERCICIO 1.4

/*
const Header = (props) => {
  //console.log(props)
  return <h1>{props.course}</h1>
}

const Content = (props) => {
  //console.log(props)
  return (
    <div>
      <p>{props.parts[0].name} {props.parts[0].exercises}</p>
      <p>{props.parts[1].name} {props.parts[1].exercises}</p>
      <p>{props.parts[2].name} {props.parts[2].exercises}</p>
    </div>
  )
}

const Total = ({parts}) => {
  return <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
}

/*
const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course}/>
      <Content parts={parts}/>
      <Total parts={(parts)}/>
    </div>
  )

  */
//}

//EJERCICIO 1.5

const Header = (props) => {
  //console.log(props)
  return <h1>{props.course.name}</h1>
}

const Content = (props) => {
  //console.log(props)
  return (
    <div>
      <p>{props.course.parts[0].name} {props.course.parts[0].exercises}</p>
      <p>{props.course.parts[1].name} {props.course.parts[1].exercises}</p>
      <p>{props.course.parts[2].name} {props.course.parts[2].exercises}</p>
    </div>
  )
}

const Total = ({course}) => {
  return <p>Number of exercises {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}</p>
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))