export enum ModuleTypes {
  Notes = 'Notes',
  Tasks = 'Tasks',
  Habits = 'Habits',
  Expenses = 'Expenses'
}

export type User = {
  id: string
  name: string
  email: string
  image: string
}

export type Note = {
  id: string | number
  title: string
  date: string
  content?: string
  tags?: NoteTag[]
}

export type NoteTag = {
  id: string | number
  name: string
  color: string
}

export type Task = {
  id: string | number
  title: string
  date: string
  done: boolean
  category?: TaskCategory
}

export type TaskCategory = {
  id: string | number
  name: string
  color: string
}

export type Expense = {
  id: string | number
  title: string
  date: string
  value: number
  type: ExpenseType
}

export type ExpenseType = {
  id: string | number
  name: string
  color: string
}

export type Habit = {
  id: string | number
  title: string
  days: Day[] | []
  date: string
}

export type Day = {
  id: string | number
  date: string
  state: DayState
}

export enum DayState {
  BLANK = 'BLANK',
  DONE = 'DONE',
  NOTDONE = 'NOTDONE'
}

export enum Currencies {
  EURO = 'EURO',
  DOLLAR = 'DOLLAR'
}

export const currencyOptions = [
  { val: Currencies.EURO, label: 'Euro (€)' },
  { val: Currencies.DOLLAR, label: 'Dollar ($)' }
]
