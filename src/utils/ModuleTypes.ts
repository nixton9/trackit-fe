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
  notToken?: string
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
  DOLLAR = 'DOLLAR',
  EURO = 'EURO',
  POUND = 'POUND',
  YEN = 'YEN',
  RUPEE = 'RUPEE',
  FRANC = 'FRANC',
  REAL = 'REAL'
}

export const currencyOptions = [
  { val: Currencies.DOLLAR, label: 'Dollar ($)' },
  { val: Currencies.EURO, label: 'Euro (€)' },
  { val: Currencies.POUND, label: 'Pound (£)' },
  { val: Currencies.YEN, label: 'Yen (¥)' },
  { val: Currencies.RUPEE, label: 'Rupee (₹)' },
  { val: Currencies.FRANC, label: 'Franc (Fr)' },
  { val: Currencies.REAL, label: 'Real (R$)' }
]
