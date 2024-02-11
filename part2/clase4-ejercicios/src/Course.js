const Course = ({course}) => {
    let totalExercises = 0
  
    return (
        <div>
        <h1>{course.name}</h1>
        {course.parts.map(content => {
            totalExercises += content.exercises;
            return (
            <div key={content.id}>
            <p>{content.name} {content.exercises}</p>
            </div>
            )        })}
        <small><strong>total of {totalExercises} exercises</strong></small>
        </div>    
    )
}

/*
const Course = ({course}) => {
  let iniValue = 0;
  
  let result = course.parts.reduce((previousValue, currentValue) => previousValue + currentValue.exercises, iniValue)

  return (
    <div>
      <h1>{course.name}</h1>
      {course.parts.map(content => {
        return (
          <div key={content.id}>
          <p>{content.name} {content.exercises}</p>
          </div>
        )
      })}
      <small><strong>total of {result} exercises</strong></small>
    </div>
  )
}
*/

export default Course;