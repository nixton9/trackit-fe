import { SortBySettings } from './SettingsTypes'
import { Note, Task, Currencies } from './ModuleTypes'

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
