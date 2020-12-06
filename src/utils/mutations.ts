import { gql } from '@apollo/client'

export const CREATE_NOTE = gql`
  mutation CreateNote($title: String!, $content: String!) {
    createNote(title: $title, content: $content) {
      id_note
      title_note
      content_note
    }
  }
`

export const ADD_TAG_TO_NOTE = gql`
  mutation AddTagToNote($note: ID!, $tag: ID!) {
    addTagToNote(note: $note, tag: $tag) {
      note_id
    }
  }
`

export const CREATE_TAG = gql`
  mutation CreateTag($name: String!, $color: String!) {
    createTag(name: $name, color: $color) {
      id_tag
    }
  }
`

export const CREATE_TASK = gql`
  mutation CreateTask($title: String!, $date: String, $category: ID) {
    createTask(title: $title, date: $date, category: $category) {
      id_task
      title_task
    }
  }
`

export const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id) {
      id_task
    }
  }
`

export const UPDATE_TASK = gql`
  mutation UpdateTask(
    $id: ID!
    $title: String
    $date: String
    $done: Boolean
    $category: ID
  ) {
    updateTask(
      id: $id
      title: $title
      date: $date
      done: $done
      category: $category
    ) {
      id_task
      title_task
    }
  }
`

export const CREATE_EXPENSE = gql`
  mutation CreateExpense(
    $title: String!
    $date: String!
    $value: Float!
    $type: ID
  ) {
    createExpense(title: $title, date: $date, value: $value, type: $type) {
      id_expense
    }
  }
`

export const DELETE_EXPENSE = gql`
  mutation DeleteExpense($id: ID!) {
    deleteExpense(id: $id) {
      id_expense
    }
  }
`

export const UPDATE_EXPENSE = gql`
  mutation UpdateExpense(
    $id: ID!
    $title: String
    $date: String
    $value: Float
    $type: ID
  ) {
    updateExpense(
      id: $id
      title: $title
      date: $date
      value: $value
      type: $type
    ) {
      id_expense
    }
  }
`

export const CREATE_HABIT = gql`
  mutation CreateHabit($title: String!) {
    createHabit(title: $title) {
      id_habit
    }
  }
`

export const DELETE_HABIT = gql`
  mutation DeleteHabit($id: ID!) {
    deleteHabit(id: $id) {
      id_habit
    }
  }
`

export const UPDATE_HABIT = gql`
  mutation UpdateHabit($id: ID!, $title: String) {
    updateHabit(id: $id, title: $title) {
      id_habit
    }
  }
`

export const UPDATE_USER_INFO = gql`
  mutation UpdateUserInfo($name: String, $image: String, $imgToDelete: String) {
    updateUserInfo(name: $name, image: $image, imgToDelete: $imgToDelete) {
      id: id_user
      name: name_user
      email: email_user
      image: image_user
    }
  }
`

export const UPDATE_USER_PASSWORD = gql`
  mutation UpdateUserPassword($password: String!, $newPassword: String!) {
    updateUserPassword(password: $password, newPassword: $newPassword) {
      id: id_user
    }
  }
`
