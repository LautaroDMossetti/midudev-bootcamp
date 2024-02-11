import { DiaryEntry, NewDiaryEntry, NonSensitiveInfoDiaryEntry } from '../types'
import diaryEntriesData from './diaries.json'

const diaryEntries: DiaryEntry[] = diaryEntriesData.diaries as DiaryEntry[]

export const diaryEntriesService = {
  getDiaryEntries: (): DiaryEntry[] => {
    return diaryEntries
  },
  getNonSensitiveInfoDiaryEntries: (): NonSensitiveInfoDiaryEntry[] => {
    return diaryEntries.map(({ id, date, weather, visibility }) => {
      return { id, date, weather, visibility }
    })
  },
  addDiaryEntry: (newDiaryEntry: NewDiaryEntry): DiaryEntry => {
    const diaryEntry = {
      id: Math.max(...diaryEntries.map(d => d.id)) + 1,
      ...newDiaryEntry
    }

    diaryEntries.push(diaryEntry)
    return diaryEntry
  },
  findById: (id: number): NonSensitiveInfoDiaryEntry | undefined => {
    const diaryEntry = diaryEntries.find(d => d.id === id)

    if (diaryEntry != null) {
      const { comment, ...restOfDiary } = diaryEntry
      return restOfDiary
    }

    return undefined
  }
}
