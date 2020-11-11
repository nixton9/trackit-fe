import React, { useState } from 'react'
import { NoteEditor } from './NoteEditor'
import { AddSubmitButton } from '../misc/Add'
import { LoadingSpinner } from '../misc/LoadingSpinner'
import { NotificationTypes, notificationState } from '../misc/Notification'
import { Styled } from '../../styles/Add.styles'
import { TagsInput, Tag } from './TagsInput'
import { NOTES } from '../../utils/queries'
import theme from '../../styles/theme'
import { DrawerAddModuleProps } from '../misc/Add'
import { ReactComponent as NotesIcon } from '../../assets/icons/notes.svg'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useSetRecoilState } from 'recoil'
import 'react-quill/dist/quill.snow.css'

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

  const setNotification = useSetRecoilState(notificationState)

  const { refetch: refetchNotes } = useQuery(NOTES)
  const [addTagToNote] = useMutation<AddTagToNotData>(ADD_TAG_TO_NOTE)
  const [createTag] = useMutation<CreateTagData>(CREATE_TAG)
  const [createNote, { loading }] = useMutation<CreateNoteData>(CREATE_NOTE, {
    variables: { title: title, content: content }
  })

  // If there are tags, we'll add them to the note. If a tag is new we need to create it first
  // and only then assign it to the note
  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault()
    if (title) {
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
                    res.data &&
                      attachTagToNote(noteId, res.data.createTag.id_tag)
                  })
                  .catch(err => console.log(err))
              } else {
                attachTagToNote(noteId, tag.id)
              }
            })
            setNotification({
              text: `New note created '${title}'`,
              type: NotificationTypes.Success
            })
            refetchNotes()
            closeModal()
          }
        })
        .catch(err =>
          setNotification({
            text: 'There was a problem, please try again',
            type: NotificationTypes.Error
          })
        )
    } else {
      setNotification({
        text: `You need to insert a title for your note`,
        type: NotificationTypes.Error
      })
    }
  }

  const attachTagToNote = (note: string, tag: string) => {
    addTagToNote({
      variables: { note: note, tag: tag },
      refetchQueries: () => [
        {
          query: NOTES
        }
      ]
    }).catch(err => console.log(err.message))
  }

  const pickRandomColor = () => {
    const { categories } = theme
    const randomColor = Object.keys(categories)[
      Math.floor(Math.random() * Object.keys(categories).length)
    ]
    return (categories as any)[randomColor]
  }

  const focusTagInput = () => {
    const input = document.querySelector('.ReactTags__tagInputField') as any
    input && input.focus()
  }

  return loading ? (
    <Styled.AddLoading>
      <LoadingSpinner />
    </Styled.AddLoading>
  ) : (
    <>
      <form onSubmit={handleSubmit}>
        <Styled.AddInputWrapper>
          <Styled.AddInput__Label>Title</Styled.AddInput__Label>
          <Styled.AddInput
            type="text"
            placeholder="Ex: Groceries list"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </Styled.AddInputWrapper>

        <Styled.AddEditor>
          <NoteEditor
            value={content}
            setValue={setContent}
            placeholder="Start writing your note here"
          />
        </Styled.AddEditor>

        <Styled.AddWidgetsContainer>
          <Styled.AddWidget onClick={focusTagInput}>
            <NotesIcon />
            <TagsInput tags={tags} setTags={setTags} />
          </Styled.AddWidget>

          <AddSubmitButton />
        </Styled.AddWidgetsContainer>
      </form>
    </>
  )
}

export default AddNote
