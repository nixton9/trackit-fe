import React, { useState, useEffect, useRef } from 'react'
import { TagChip } from './TagChip'
import Tooltip from 'react-tooltip-lite'
import { NoteEditor } from './NoteEditor'
import { TagEditor } from './TagEditor'
import { TagsInput, Tag } from './TagsInput'
import { PageLoading } from '../misc/PageLoading'
import { PageError } from '../misc/PageError'
import { NotificationTypes, notificationState } from '../misc/Notification'
import { alertState } from '../misc/Alert'
import { ThreeDotsMenu } from '../misc/ThreeDotsMenu'
import { CopyToClipboard } from '../misc/CopyToClipboard'
import { Walkthrough, Pages } from '../misc/Walkthrough/Walkthrough'
import { Styled } from '../../styles/Page.styles'
import { displayDateString, parseDateInverse } from '../../utils/dateHelpers'
import { pickRandomColor } from '../../utils/globalHelpers'
import { NoteTag } from '../../utils/ModuleTypes'
import { SINGLE_NOTE, TAGS } from '../../utils/queries'
import { useLocalStorage } from '../../utils/useLocalStorage'
import { ReactComponent as ChevronIcon } from '../../assets/icons/chevron.svg'
import { ReactComponent as PlusIcon } from '../../assets/icons/plus.svg'
import { ReactComponent as MinusIcon } from '../../assets/icons/minus.svg'
import {
  UPDATE_NOTE,
  ADD_TAG_TO_NOTE,
  DELETE_NOTE,
  REMOVE_TAG_FROM_NOTE,
  CREATE_TAG
} from '../../utils/mutations'
import { Link, RouteComponentProps, useHistory } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { useSetRecoilState } from 'recoil'

type MatchParams = {
  id: string
}
interface MatchProps extends RouteComponentProps<MatchParams> {
  setWidgets: any
}

const NoteDetail: React.FC<MatchProps> = ({ match, setWidgets }) => {
  const [noteTitle, setNoteTitle] = useState('')
  const [noteContent, setNoteContent] = useState('')
  const [parsedContent, setParsedContent] = useState('')
  const [noteTags, setNoteTags] = useState<NoteTag[]>([])
  const [inputTags, setInputTags] = useState<Tag[]>([])
  const [showEditor, setShowEditor] = useState(false)
  const [message, setMessage] = useState('')
  const [noteWasEdited, setNoteWasEdited] = useState(false)

  const [showTagsInput, setShowTagsInput] = useState(false)
  const [showTagEditor, setShowTagEditor] = useState(false)
  const [activeTag, setActiveTag] = useState<NoteTag | null>(null)

  const setNotification = useSetRecoilState(notificationState)
  const setAlert = useSetRecoilState(alertState)

  const [showDetailNoteWT, setShowDetailNoteWT] = useLocalStorage(
    'showDetailNoteWT',
    true
  )

  const { loading, error, data } = useQuery(SINGLE_NOTE, {
    variables: { id: match.params.id }
  })
  const { refetch: refetchNote } = useQuery(SINGLE_NOTE, {
    variables: { id: match.params.id }
  })
  const { refetch: refetchTags } = useQuery(TAGS)
  const [updateNote, { error: errorEdit, loading: loadingEdit }] = useMutation(
    UPDATE_NOTE,
    {
      variables: { id: match.params.id, title: noteTitle, content: noteContent }
    }
  )
  const [addTagToNote] = useMutation(ADD_TAG_TO_NOTE)
  const [createTag] = useMutation(CREATE_TAG)

  const editorRef = useRef<any>(null)

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

  const attachTagToNote = (note: string, tag: string) => {
    addTagToNote({
      variables: { note: note, tag: tag }
    })
      .then(() => {
        setInputTags([])
        refetchTags()
      })
      .catch(err => console.log(err.message))
  }

  const history = useHistory()

  const toggleEditor = () => {
    setShowEditor(!showEditor)
  }

  const handleSubmit = () => {
    if (inputTags.length) {
      inputTags.forEach((tag: Tag) => {
        if (isNaN(Number(tag.id))) {
          createTag({
            variables: { name: tag.text, color: pickRandomColor() }
          })
            .then(res => {
              res.data &&
                attachTagToNote(match.params.id, res.data.createTag.id_tag)
            })
            .catch(err => console.log(err))
        } else {
          attachTagToNote(match.params.id, tag.id)
        }
      })
    }

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
      .finally(() => {
        setShowTagEditor(false)
        setShowTagsInput(false)
      })
  }

  const handleDeleteConfirm = () => {
    setAlert({
      text: 'This note will be removed',
      onConfirm: handleDeleteNote
    })
  }

  const handleDeleteNote = () => {
    deleteNote()
      .then(res => {
        history.push(`/notes`)
        setNotification({
          text: `Note '${noteTitle}' was deleted`,
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

  const onCopyNote = () =>
    setNotification({
      text: `Content was copied!`,
      type: NotificationTypes.Success
    })

  useEffect(() => {
    setWidgets(false)
    return () => setWidgets(true)
  })

  useEffect(() => {
    if (data) {
      setNoteContent(data.singleNote.content)
      setNoteTitle(data.singleNote.title)
      setNoteTags(data.singleNote.tags)
    }
  }, [data])

  useEffect(() => {
    if (data && noteTitle && noteContent) {
      setNoteWasEdited(
        data.singleNote.content !== noteContent ||
          data.singleNote.title !== noteTitle ||
          Boolean(inputTags.length)
      )
    }
  }, [data, noteTitle, noteContent, inputTags])

  useEffect(() => {
    if (message) setTimeout(() => setMessage(''), 1500)
  }, [message])

  useEffect(() => {
    editorRef.current &&
      setParsedContent(editorRef.current?.unprivilegedEditor.getText())
  }, [noteContent])

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
        <PageLoading centered />
      ) : (
        <>
          {showDetailNoteWT && (
            <Walkthrough
              page={Pages.DETAILNOTE}
              setShow={setShowDetailNoteWT}
            />
          )}
          <Styled.DetailHeader
            editorActive={showEditor}
            className="note-detail-header"
          >
            <div className="title-wrapper">
              <Styled.DetailTitle
                placeholder="Title for the note"
                value={noteTitle}
                onChange={e => setNoteTitle(e.target.value)}
                className="detail-title"
              />
              <Styled.DetailDate>
                {displayDateString(parseDateInverse(data.singleNote.date))}
              </Styled.DetailDate>
            </div>

            <ThreeDotsMenu
              options={menuOptions}
              componentItem={
                <CopyToClipboard onCopy={onCopyNote} text={parsedContent} />
              }
            />
          </Styled.DetailHeader>

          <Styled.DetailTagsContainer className="detail-tags">
            <Styled.DetailTags>
              <Styled.DetailTags__Inner>
                {data.singleNote.tags && data.singleNote.tags.length ? (
                  data.singleNote.tags.map((tag: NoteTag, i: number) => (
                    <Tooltip
                      key={i}
                      eventOff={'onClick'}
                      content={'Click to edit tag'}
                      arrow={false}
                      direction={'up'}
                      className="tag-tooltip"
                    >
                      <TagChip
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
                <div
                  onClick={() => setShowTagsInput(!showTagsInput)}
                  className="mbl-click"
                >
                  {showTagsInput ? <MinusIcon /> : <PlusIcon />}
                </div>
              </Tooltip>
            </Styled.DetailTags>

            {showTagEditor && (
              <Styled.DetailTagEditor className="editor">
                <TagEditor
                  tag={activeTag}
                  noteId={match.params.id}
                  closeEditor={() => setShowTagEditor(false)}
                  refetchQuery={refetchNote}
                  showClose
                />
              </Styled.DetailTagEditor>
            )}

            {showTagsInput && (
              <Styled.DetailTagEditor>
                <TagsInput
                  tags={inputTags}
                  excludedTags={noteTags.map(tag => tag.id)}
                  setTags={setInputTags}
                />
              </Styled.DetailTagEditor>
            )}
          </Styled.DetailTagsContainer>

          <Styled.DetailContent>
            <NoteEditor
              placeholder="Type here"
              value={noteContent}
              setValue={setNoteContent}
              showEditor={showEditor}
              readMode
              editorRef={editorRef}
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
