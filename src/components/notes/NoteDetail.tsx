import React, { useState, useEffect } from 'react'
import Tag from './Tag'
import { NoteEditor } from './NoteEditor'
import { AddSubmitButton } from '../misc/Add'
import { PageLoading } from '../misc/PageLoading'
import { PageError } from '../misc/PageError'
import { NotificationTypes, notificationState } from '../misc/Notification'
import { ThreeDotsMenu } from '../misc/ThreeDotsMenu'
import { Styled } from '../../styles/Page.styles'
import { displayDateString, parseDateInverse } from '../../utils/dateHelpers'
import { NoteTag } from '../../utils/ModuleTypes'
import { SINGLE_NOTE } from '../../utils/queries'
import { ReactComponent as ChevronIcon } from '../../assets/icons/chevron.svg'
import { Link, RouteComponentProps, useHistory } from 'react-router-dom'
import { useQuery, useMutation, gql } from '@apollo/client'
import { useSetRecoilState } from 'recoil'

const UPDATE_NOTE = gql`
  mutation UpdateNote($id: ID!, $title: String, $content: String) {
    updateNote(id: $id, title: $title, content: $content) {
      id_note
    }
  }
`

const DELETE_NOTE = gql`
  mutation DeleteNote($id: ID!) {
    deleteNote(id: $id) {
      id_note
    }
  }
`

type MatchParams = {
  id: string
}

interface MatchProps extends RouteComponentProps<MatchParams> {
  setWidgets: any
}

const NoteDetail: React.FC<MatchProps> = ({ match, setWidgets }) => {
  const [noteTitle, setNoteTitle] = useState('')
  const [noteContent, setNoteContent] = useState('')
  const [showEditor, setShowEditor] = useState(false)
  const [message, setMessage] = useState('')
  const [noteWasEdited, setNoteWasEdited] = useState(false)

  const setNotification = useSetRecoilState(notificationState)

  const { loading, error, data } = useQuery(SINGLE_NOTE, {
    variables: { id: match.params.id }
  })

  const { refetch: refetchNote } = useQuery(SINGLE_NOTE, {
    variables: { id: match.params.id }
  })

  const [updateNote, { error: errorEdit, loading: loadingEdit }] = useMutation(
    UPDATE_NOTE,
    {
      variables: { id: match.params.id, title: noteTitle, content: noteContent }
    }
  )

  const [
    deleteNote,
    { error: errorDelete, loading: loadingDelete }
  ] = useMutation(DELETE_NOTE, {
    variables: {
      id: match.params.id
    }
  })

  const history = useHistory()

  const toggleEditor = () => {
    setShowEditor(!showEditor)
  }

  const handleSubmit = () => {
    updateNote()
      .then(res => {
        setNotification({
          text: `Note was successfully updated`,
          type: NotificationTypes.Success
        })
        refetchNote()
      })
      .catch(err =>
        setNotification({
          text: 'There was a problem, please try again',
          type: NotificationTypes.Error
        })
      )
  }

  const handleDeleteNote = () => {
    if (window.confirm('Sure?')) {
      deleteNote()
        .then(res => {
          history.push(`/notes`)
          setNotification({
            text: `Note was deleted`,
            type: NotificationTypes.Success
          })
        })
        .catch(err => console.log(err.message))
    }
  }

  const menuOptions = [
    { label: 'Delete note', onClick: handleDeleteNote },
    { label: showEditor ? 'Hide editor' : 'Show editor', onClick: toggleEditor }
  ]

  useEffect(() => {
    setWidgets(false)
    return () => setWidgets(true)
  })

  useEffect(() => {
    if (data) {
      setNoteContent(data.singleNote.content)
      setNoteTitle(data.singleNote.title)
    }
  }, [data])

  useEffect(() => {
    if (data && noteTitle && noteContent) {
      setNoteWasEdited(
        data.singleNote.content !== noteContent ||
          data.singleNote.title !== noteTitle
      )
    }
  }, [data, noteTitle, noteContent])

  useEffect(() => {
    if (message) setTimeout(() => setMessage(''), 1500)
  }, [message])

  const isLoading = loading || loadingEdit || loadingDelete

  const errors = error
    ? error
    : errorEdit
    ? errorEdit
    : errorDelete
    ? errorDelete
    : null

  return (
    <Styled.PageContainer>
      <Styled.DetailBack>
        <Link to="/notes">
          <ChevronIcon />
        </Link>
      </Styled.DetailBack>

      {errors ? (
        <PageError>{errors.message}</PageError>
      ) : isLoading ? (
        <PageLoading />
      ) : (
        <>
          <Styled.DetailHeader editorActive={showEditor}>
            <Styled.DetailTitle
              placeholder="Title for the note"
              value={noteTitle}
              onChange={e => setNoteTitle(e.target.value)}
            />
            <ThreeDotsMenu options={menuOptions} />
          </Styled.DetailHeader>

          <Styled.DetailDate>
            {displayDateString(parseDateInverse(data.singleNote.date))}
          </Styled.DetailDate>

          <Styled.DetailTags>
            {data.singleNote.tags &&
              data.singleNote.tags.map((tag: NoteTag) => (
                <Tag
                  key={tag.id}
                  id={tag.id}
                  name={tag.name}
                  color={tag.color}
                />
              ))}
          </Styled.DetailTags>

          <Styled.DetailContent>
            <NoteEditor
              value={noteContent}
              setValue={setNoteContent}
              showEditor={showEditor}
              readMode
            />
          </Styled.DetailContent>

          {(noteWasEdited || message) && (
            <Styled.DetailSave>
              {message ? (
                <p>{message}</p>
              ) : (
                <>
                  <p>Save changes</p>
                  <AddSubmitButton handleSubmit={handleSubmit} />
                </>
              )}
            </Styled.DetailSave>
          )}
        </>
      )}
    </Styled.PageContainer>
  )
}

export default NoteDetail
