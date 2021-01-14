import React, { useState, useEffect, useRef } from 'react'
import { NoteEditor } from './NoteEditor'
import { SubmitButton } from '../misc/SubmitButton'
import { LoadingSpinner } from '../misc/LoadingSpinner'
import { NotificationTypes, notificationState } from '../misc/Notification'
import { Styled } from '../../styles/Add.styles'
import { TagsInput, Tag } from './TagsInput'
import { NOTES } from '../../utils/queries'
import { CREATE_NOTE, ADD_TAG_TO_NOTE, CREATE_TAG } from '../../utils/mutations'
import { pickRandomColor } from '../../utils/globalHelpers'
import { DrawerAddModuleProps } from '../misc/Add'
import { useMutation, useQuery } from '@apollo/client'
import { useSetRecoilState } from 'recoil'
import { useHistory } from 'react-router-dom'
import 'react-quill/dist/quill.snow.css'

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

type AddTagToNoteData = {
  addTagToNote: {
    note_id: string
  }
}

let cachedContent: any

const AddNote: React.FC<DrawerAddModuleProps> = ({ closeModal }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState(cachedContent || '')
  const [tags, setTags] = useState<Tag[] | []>([])

  const setNotification = useSetRecoilState(notificationState)

  const { refetch: refetchNotes } = useQuery(NOTES)
  const [addTagToNote] = useMutation<AddTagToNoteData>(ADD_TAG_TO_NOTE)
  const [createTag] = useMutation<CreateTagData>(CREATE_TAG)
  const [createNote, { loading }] = useMutation<CreateNoteData>(CREATE_NOTE, {
    variables: { title: title, content: content }
  })

  const titleRef: React.RefObject<HTMLInputElement> = useRef(null)
  const history = useHistory()

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
            setContent('')
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

  useEffect(() => {
    if (titleRef && titleRef.current) {
      titleRef.current.focus()
    }

    history.push(`#`)

    window.onpopstate = (e: any) => {
      closeModal()
    }
  }, [closeModal, history])

  useEffect(() => () => (cachedContent = content))

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
            ref={titleRef}
            data-test-id="add-note-title-input"
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
          <TagsInput tags={tags} setTags={setTags} />

          <SubmitButton />
        </Styled.AddWidgetsContainer>
      </form>
    </>
  )
}

export default AddNote
