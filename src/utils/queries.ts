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

export const TAGS = gql`
  query Tags {
    tags {
      id: id_tag
      name: name_tag
      color: color_tag
    }
  }
`
