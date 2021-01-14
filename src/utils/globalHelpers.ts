import { SortBySettings } from './SettingsTypes'
import { Note, Task, Habit, Currencies, DayState } from './ModuleTypes'
import { theme } from '../styles/theme'

export const sortData = (
  data: Note[] | Task[] | Habit[],
  sortBy: SortBySettings,
  invertedDate: boolean = false
) => {
  return sortBy === SortBySettings.DATE
    ? data
        .slice()
        .sort((a: Note | Task | Habit, b: Note | Task | Habit) =>
          invertedDate
            ? new Date(a.date).getTime() - new Date(b.date).getTime()
            : new Date(b.date).getTime() - new Date(a.date).getTime()
        )
    : sortBy === SortBySettings.ALPHABETICAL
    ? data
        .slice()
        .sort((a: Note | Task | Habit, b: Note | Task | Habit) =>
          a.title.toUpperCase() < b.title.toUpperCase()
            ? -1
            : a.title.toUpperCase() > b.title.toUpperCase()
            ? 1
            : 0
        )
    : data
}

export const capitalize = (name: string) =>
  name.charAt(0).toUpperCase() + name.slice(1)

export const showCurrencySym = (currency: Currencies) => {
  switch (currency) {
    case Currencies.EURO:
      return '€'

    case Currencies.DOLLAR:
      return '$'
  }
}

export const generateRandomString = () =>
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15)

export const months = [
  { id: 1, name: 'January' },
  { id: 2, name: 'February' },
  { id: 3, name: 'March' },
  { id: 4, name: 'April' },
  { id: 5, name: 'May' },
  { id: 6, name: 'June' },
  { id: 7, name: 'July' },
  { id: 8, name: 'August' },
  { id: 9, name: 'September' },
  { id: 10, name: 'October' },
  { id: 11, name: 'November' },
  { id: 12, name: 'December' }
]

export const getNextDayState = (state: DayState) => {
  switch (state) {
    case DayState.DONE:
      return DayState.NOTDONE
    case DayState.NOTDONE:
      return DayState.BLANK
    case DayState.BLANK:
      return DayState.DONE
  }
}

export const formatUserName = (name: string) => {
  if (name.split(' ').length > 1) {
    return capitalize(name.split(' ')[0])
  }
  return capitalize(name)
}

export const formatFullUserName = (name: string) =>
  name
    .split(' ')
    .map(word => capitalize(word))
    .join(' ')

export const pickRandomColor = () => {
  const { categories } = theme
  const randomColor = Object.keys(categories)[
    Math.floor(Math.random() * Object.keys(categories).length)
  ]
  return (categories as any)[randomColor]
}
