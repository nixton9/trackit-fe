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
  query Tasks {
    tasks {
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

export const CATEGORIES = gql`
  query Categories {
    categories {
      id: id_category
      name: name_category
      color: color_category
    }
  }
`
