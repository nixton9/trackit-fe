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
