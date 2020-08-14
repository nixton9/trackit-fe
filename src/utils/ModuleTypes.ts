export enum ModuleTypes {
  Notes = 'Notes',
  Tasks = 'Tasks',
  Habits = 'Habits',
  Expenses = 'Expenses'
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
  category: ExpenseCategory
}

export type ExpenseCategory = {
  id: string | number
  name: string
  color: string
}

export type Habit = {
  id: string | number
  title: string
  days: { date: string; done: boolean }[] | []
}
