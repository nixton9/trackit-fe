import { NoteTag, TaskCategory, Habit } from './ModuleTypes'

export const notesViewOptions = (tags: { tags: NoteTag[] }) => {
  return tags && tags.tags.length
    ? [
        { val: 'all', label: 'All' },
        ...tags.tags.map((tag: NoteTag) => ({
          val: tag.id,
          label: tag.name
        }))
      ]
    : [
        { val: 'all', label: 'All' },
        { val: '-', label: 'No tags to display', disabled: true }
      ]
}

export const tasksViewOptions = (categories: {
  categories: TaskCategory[]
}) => {
  return categories && categories.categories.length
    ? [
        { val: 'all', label: 'All' },
        { val: 'today', label: 'Today' },
        ...categories.categories.map((cat: TaskCategory) => ({
          val: cat.id,
          label: cat.name
        }))
      ]
    : [
        { val: 'all', label: 'All' },
        { val: 'today', label: 'Today' }
      ]
}

export const habitsViewOptions = (data: { habits: Habit[] }) => {
  return data && data.habits.length
    ? [
        { val: 'all', label: 'All' },
        ...data.habits.map(habit => ({
          val: habit.id,
          label: habit.title
        }))
      ]
    : [
        { val: 'all', label: 'All' },
        { val: '-', label: 'No habits to display', disabled: true }
      ]
}
