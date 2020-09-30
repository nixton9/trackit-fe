import React, { useState } from 'react'
import { LoadingSpinner } from '../misc/LoadingSpinner'
import { Styled } from '../../styles/Add.styles'
import { AddSubmitButton } from '../misc/Add'
import { TagsInput, Tag } from './TagsInput'
import { NOTES } from '../../utils/queries'
import theme from '../../styles/theme'
import { DrawerAddModuleProps } from '../misc/Add'
import { ReactComponent as ErrorIcon } from '../../assets/icons/error.svg'
import { ReactComponent as CheckIcon } from '../../assets/icons/check.svg'
import { ReactComponent as NotesIcon } from '../../assets/icons/notes.svg'
import { gql, useMutation, useQuery } from '@apollo/client'

const CREATE_NOTE = gql`
  mutation CreateNote($title: String!, $content: String!) {
    createNote(title: $title, content: $content) {
      id_note
      title_note
      content_note
    }
  }
`

const ADD_TAG_TO_NOTE = gql`
  mutation AddTagToNote($note: ID!, $tag: ID!) {
    addTagToNote(note: $note, tag: $tag) {
      note_id
    }
  }
`

const CREATE_TAG = gql`
  mutation CreateTag($name: String!, $color: String!) {
    createTag(name: $name, color: $color) {
      id_tag
    }
  }
`

type CreateNoteData = {
  createNote: {
    id_note: string
    title_note: string
    content_note: string
  }
}

type CreateTagData = {
  createTag: {
    id_tag: string
  }
}

type AddTagToNotData = {
  addTagToNote: {
    note_id: string
  }
}

const AddNote: React.FC<DrawerAddModuleProps> = ({ closeModal }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState<Tag[] | []>([])

  const [message, setMessage] = useState('')

  const { refetch: refetchNotes } = useQuery(NOTES)
  const [addTagToNote] = useMutation<AddTagToNotData>(ADD_TAG_TO_NOTE)
  const [createTag] = useMutation<CreateTagData>(CREATE_TAG)
  const [createNote, { error, loading }] = useMutation<CreateNoteData>(
    CREATE_NOTE,
    {
      variables: { title: title, content: content }
    }
  )

  // If there are tags, we'll add them to the note. If a tag is new we need to create it first
  // and only then assign it to the note
  const handleSubmit = () => {
    createNote()
      .then(results => {
        if (results && results.data && results.data.createNote) {
          const noteId = results.data.createNote.id_note
          tags.forEach(tag => {
            if (isNaN(Number(tag.id))) {
              createTag({
                variables: { name: tag.text, color: pickRandomColor() }
              })
                .then(res => {
                  res.data && attachTagToNote(noteId, res.data.createTag.id_tag)
                })
                .catch(err => console.log(err))
            } else {
              attachTagToNote(noteId, tag.id)
            }
          })
          setMessage('Note created with success!')
          refetchNotes()
          setTimeout(() => {
            closeModal()
            setMessage('')
          }, 1500)
        }
      })
      .catch(err => console.log(err))
  }

  const attachTagToNote = (note: string, tag: string) => {
    addTagToNote({
      variables: { note: note, tag: tag }
    }).catch(err => console.log(err.message))
  }

  const pickRandomColor = () => {
    const { categories } = theme
    const randomColor = Object.keys(categories)[
      Math.floor(Math.random() * Object.keys(categories).length)
    ]
    return (categories as any)[randomColor]
  }

  return loading ? (
    <Styled.AddLoading>
      <LoadingSpinner />
    </Styled.AddLoading>
  ) : error ? (
    <Styled.AddMessage>
      <ErrorIcon />
      <p>{error.message}</p>
    </Styled.AddMessage>
  ) : message ? (
    <Styled.AddMessage>
      <CheckIcon />
      <p>{message}</p>
    </Styled.AddMessage>
  ) : (
    <>
      <Styled.AddInput
        type="text"
        placeholder="Ex: Groceries list"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <textarea
        placeholder="- Milk;"
        value={content}
        onChange={e => setContent(e.target.value)}
      />

      <Styled.AddWidgetsContainer>
        <Styled.AddWidget>
          <NotesIcon />
          <TagsInput tags={tags} setTags={setTags} />
        </Styled.AddWidget>

        <AddSubmitButton handleSubmit={handleSubmit} />
      </Styled.AddWidgetsContainer>
    </>
  )
}

export default AddNote
