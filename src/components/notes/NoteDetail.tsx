import React, { useState, useEffect } from 'react'
import Tag from './Tag'
import Tooltip from 'react-tooltip-lite'
import { NoteEditor } from './NoteEditor'
import { TagEditor } from './TagEditor'
import { PageLoading } from '../misc/PageLoading'
import { PageError } from '../misc/PageError'
import { NotificationTypes, notificationState } from '../misc/Notification'
import { alertState } from '../misc/Alert'
import { ThreeDotsMenu } from '../misc/ThreeDotsMenu'
import { Styled } from '../../styles/Page.styles'
import { displayDateString, parseDateInverse } from '../../utils/dateHelpers'
import { NoteTag } from '../../utils/ModuleTypes'
import { SINGLE_NOTE } from '../../utils/queries'
import { ReactComponent as ChevronIcon } from '../../assets/icons/chevron.svg'
import { ReactComponent as PlusIcon } from '../../assets/icons/plus.svg'
import { ReactComponent as MinusIcon } from '../../assets/icons/minus.svg'
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

const REMOVE_TAG_FROM_NOTE = gql`
  mutation RemoveTagFromNote($note: ID!, $tag: ID!) {
    removeTagFromNote(note: $note, tag: $tag) {
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

  const [showTagEditor, setShowTagEditor] = useState(false)
  const [activeTag, setActiveTag] = useState<NoteTag | null>(null)

  const setNotification = useSetRecoilState(notificationState)
  const setAlert = useSetRecoilState(alertState)

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

  const [
    removeTagFromNote,
    { error: errorRemove, loading: loadingRemove }
  ] = useMutation(REMOVE_TAG_FROM_NOTE)

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

  const handleDeleteConfirm = () => {
    setAlert({
      text: 'This note will be removed.',
      onConfirm: handleDeleteNote
    })
  }

  const handleDeleteNote = () => {
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

  const handleRemoveTag = (tagId: string | number) => {
    removeTagFromNote({
      variables: {
        note: match.params.id,
        tag: tagId
      }
    })
      .then(res => {
        refetchNote()
        setNotification({
          text: `Tag was removed from note`,
          type: NotificationTypes.Success
        })
      })
      .catch(err =>
        setNotification({
          text: 'There was a problem, please try again',
          type: NotificationTypes.Error
        })
      )
  }

  const handleRemoveTagConfirm = (tagId: string | number) => {
    setAlert({
      text: 'This tag will be removed from this note',
      onConfirm: () => handleRemoveTag(tagId)
    })
  }

  const handleTagClick = (tag: NoteTag) => {
    setActiveTag(tag)
    setShowTagEditor(true)
  }

  const handlePlusClick = () => {
    if (showTagEditor) {
      setShowTagEditor(false)
    } else {
      setActiveTag(null)
      setShowTagEditor(true)
    }
  }

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

  const menuOptions = [
    { label: 'Delete note', onClick: handleDeleteConfirm },
    { label: showEditor ? 'Hide editor' : 'Show editor', onClick: toggleEditor }
  ]

  const isLoading = loading || loadingEdit || loadingDelete || loadingRemove

  const errors = error
    ? error
    : errorEdit
    ? errorEdit
    : errorDelete
    ? errorDelete
    : errorRemove
    ? errorRemove
    : null

  return (
    <Styled.PageContainer className="note-detail">
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
            <div>
              <Styled.DetailTitle
                placeholder="Title for the note"
                value={noteTitle}
                onChange={e => setNoteTitle(e.target.value)}
              />
              <Styled.DetailDate>
                {displayDateString(parseDateInverse(data.singleNote.date))}
              </Styled.DetailDate>
            </div>

            <ThreeDotsMenu options={menuOptions} />
          </Styled.DetailHeader>

          <Styled.DetailTags>
            <Styled.DetailTags__Inner>
              {data.singleNote.tags && data.singleNote.tags.length ? (
                data.singleNote.tags.map((tag: NoteTag) => (
                  <Tooltip
                    eventOff={'onClick'}
                    content={'Click to edit tag'}
                    arrow={false}
                    direction={'up'}
                    className="tag-tooltip"
                  >
                    <Tag
                      key={tag.id}
                      id={tag.id}
                      name={tag.name}
                      color={tag.color}
                      onClick={() => handleTagClick(tag)}
                      onDelete={() => handleRemoveTagConfirm(tag.id)}
                    />
                  </Tooltip>
                ))
              ) : (
                <p>No tags</p>
              )}
            </Styled.DetailTags__Inner>
            <Tooltip
              eventOff={'onClick'}
              content={'Add tag'}
              arrow={false}
              direction={'up'}
            >
              <div onClick={handlePlusClick} className="mbl-click">
                {showTagEditor ? <MinusIcon /> : <PlusIcon />}
              </div>
            </Tooltip>
          </Styled.DetailTags>

          {showTagEditor && (
            <Styled.DetailTagEditor>
              <TagEditor
                tag={activeTag}
                noteId={match.params.id}
                closeEditor={() => setShowTagEditor(false)}
                refetchQuery={refetchNote}
              />
            </Styled.DetailTagEditor>
          )}

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
                <Styled.DetailSave__Button
                  onClick={handleSubmit}
                  data-test-id="submit-btn"
                >
                  Save changes
                </Styled.DetailSave__Button>
              )}
            </Styled.DetailSave>
          )}
        </>
      )}
    </Styled.PageContainer>
  )
}

export default NoteDetail
