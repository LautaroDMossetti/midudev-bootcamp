import express from 'express'
import { diaryEntriesService } from '../services/diaryEntriesService'
import { toNewDiaryEntry } from '../utils'

const diaryEntriesRouter = express.Router()

diaryEntriesRouter.get('/', (_req, res) => {
  const diaryEntries = diaryEntriesService.getNonSensitiveInfoDiaryEntries()
  res.send(diaryEntries)
})

diaryEntriesRouter.get('/:id', (req, res) => {
  // const diary = diaryEntriesService.findById(Number(req.params.id)) // lo mismo que la linea inferior
  const diaryEntry = diaryEntriesService.findById(+req.params.id)

  return (diaryEntry != null) ? res.send(diaryEntry) : res.sendStatus(404)
})

diaryEntriesRouter.post('/', (req, res) => {
  try {
    const newDiaryEntry = toNewDiaryEntry(req.body)

    const addedDiaryEntry = diaryEntriesService.addDiaryEntry(newDiaryEntry)

    res.json(addedDiaryEntry)
  } catch (error) {
    (error instanceof Error)
      ? res.status(400).send(error.message)
      : res.status(400).send('Unexpected error')
  }
})

export default diaryEntriesRouter
