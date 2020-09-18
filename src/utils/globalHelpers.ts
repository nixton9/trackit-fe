import { SortBySettings } from './SettingsTypes'
import { Note, Task, Expense } from './ModuleTypes'

export const sortData = (
  data: Note[] | Task[] | Expense[],
  sortBy: SortBySettings
) => {
  return sortBy === SortBySettings.DATE
    ? data
        .slice()
        .sort(
          (a: Note | Task | Expense, b: Note | Task | Expense) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
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
