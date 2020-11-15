import { gql } from '@apollo/client'

export const NOTES = gql`
  query Notes {
    notes {
      id: id_note
      title: title_note
      date: createdAt
      tags {
        id: id_tag
        name: name_tag
        color: color_tag
      }
    }
  }
`

export const SINGLE_NOTE = gql`
  query SingleNote($id: ID!) {
    singleNote(id: $id) {
      id: id_note
      title: title_note
      content: content_note
      date: createdAt
      tags {
        id: id_tag
        name: name_tag
        color: color_tag
      }
    }
  }
`

export const TAGS = gql`
  query Tags {
    tags {
      id: id_tag
      name: name_tag
      color: color_tag
    }
  }
`

export const TASKS = gql`
  query Tasks($done: Boolean) {
    tasks(done: $done) {
      id: id_task
      title: title_task
      date: date_task
      done: done
      category {
        id: id_category
        name: name_category
        color: color_category
      }
    }
  }
`

export const SINGLE_TASK = gql`
  query SingleTask($id: ID!) {
    singleTask(id: $id) {
      title: title_task
      date: date_task
      done
      category {
        id: id_category
        name: name_category
        color: color_category
      }
    }
  }
`

export const CATEGORIES = gql`
  query Categories {
    categories {
      id: id_category
      name: name_category
      color: color_category
    }
  }
`

export const EXPENSES = gql`
  query Expenses {
    expenses {
      id: id_expense
      title: title_expense
      value: value_expense
      date: date_expense
      type {
        id: id_type
        name: name_type
        color: color_type
      }
    }
  }
`

export const SINGLE_EXPENSE = gql`
  query SingleExpense($id: ID!) {
    singleExpense(id: $id) {
      id: id_expense
      title: title_expense
      value: value_expense
      date: date_expense
      type {
        id: id_type
        name: name_type
        color: color_type
      }
    }
  }
`

export const TYPES = gql`
  query Types {
    types {
      id: id_type
      name: name_type
      color: color_type
    }
  }
`

export const HABITS = gql`
  query Habits {
    habits {
      id: id_habit
      title: title_habit
      days {
        id: id_day
        date: date_day
        state: state_day
      }
    }
  }
`

export const SINGLE_HABIT = gql`
  query SingleHabit($id: ID!) {
    singleHabit(id: $id) {
      id: id_habit
      title: title_habit
    }
  }
`

export const SEARCH = gql`
  query Search($query: String!) {
    search(query: $query) {
      notes {
        id: id_note
        title: title_note
        date: createdAt
      }
      tasks {
        id: id_task
        title: title_task
        date: date_task
        done
      }
      expenses {
        id: id_expense
        title: title_expense
        value: value_expense
        date: date_expense
      }
      habits {
        id: id_habit
        title: title_habit
        days {
          id: id_day
          date: date_day
          state: state_day
        }
      }
    }
  }
`
