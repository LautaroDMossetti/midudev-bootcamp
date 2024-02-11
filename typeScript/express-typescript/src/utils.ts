import { NewDiaryEntry } from './types'
import { Weather, Visibility } from './enums'

const isString = (string: any): boolean => {
  return (typeof string === 'string' || string instanceof String)
}

const isDate = (date: any): boolean => {
  return (isString(date) && Boolean(Date.parse(date)))
}

const isWeather = (weather: any): boolean => {
  return (isString(weather) && Object.values(Weather).includes(weather))
}

const isVisibility = (visibility: any): boolean => {
  return (isString(visibility) && Object.values(Visibility).includes(visibility))
}

const parseDate = (dateFromRequest: any): string => {
  if (!isDate(dateFromRequest)) {
    throw new Error('Incorrect or missing date')
  }

  return dateFromRequest
}

const parseComment = (commentFromRequest: any): string => {
  if (!isString(commentFromRequest)) {
    throw new Error('Incorrect or missing comment')
  }

  return commentFromRequest
}

const parseWeather = (weatherFromRequest: any): Weather => {
  if (!isWeather(weatherFromRequest)) {
    throw new Error('Incorrect or missing weather')
  }

  return weatherFromRequest
}

const parseVisibility = (visibilityFromRequest: any): Visibility => {
  if (!isVisibility(visibilityFromRequest)) {
    throw new Error('Incorrect or missing visibility')
  }

  return visibilityFromRequest
}

export const toNewDiaryEntry = (object: any): NewDiaryEntry => {
  const newDiaryEntry: NewDiaryEntry = {
    date: parseDate(object.date),
    weather: parseWeather(object.weather),
    visibility: parseVisibility(object.visibility),
    comment: parseComment(object.comment)
  }

  return newDiaryEntry
}
