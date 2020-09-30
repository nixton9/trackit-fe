import { SortBySettings } from './SettingsTypes'
import { Note, Task } from './ModuleTypes'

export const sortData = (
  data: Note[] | Task[],
  sortBy: SortBySettings,
  invertedDate: boolean = false
) => {
  return sortBy === SortBySettings.DATE
    ? data
        .slice()
        .sort((a: Note | Task, b: Note | Task) =>
          invertedDate
            ? new Date(a.date).getTime() - new Date(b.date).getTime()
            : new Date(b.date).getTime() - new Date(a.date).getTime()
        )
    : sortBy === SortBySettings.ALPHABETICAL
    ? data
        .slice()
        .sort((a: Note, b: Note) =>
          a.title.toUpperCase() < b.title.toUpperCase()
            ? -1
            : a.title.toUpperCase() > b.title.toUpperCase()
            ? 1
            : 0
        )
    : data
}
