import React, { useState, useEffect } from 'react'
import Tag from './Tag'
import { NoteEditor } from './NoteEditor'
import { AddSubmitButton } from '../misc/Add'
import { PageLoading } from '../misc/PageLoading'
import { PageError } from '../misc/PageError'
import { Styled } from '../../styles/Page.styles'
import { displayDateString, parseDateInverse } from '../../utils/dateHelpers'
import { NoteTag } from '../../utils/ModuleTypes'
import { SINGLE_NOTE } from '../../utils/queries'
import { ReactComponent as ChevronIcon } from '../../assets/icons/chevron.svg'
import { ReactComponent as EditIcon } from '../../assets/icons/edit.svg'
import { Link, RouteComponentProps } from 'react-router-dom'
import { useQuery, useMutation, gql } from '@apollo/client'

const UPDATE_NOTE = gql`
  mutation UpdateNote($id: ID!, $title: String, $content: String) {
    updateNote(id: $id, title: $title, content: $content) {
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

  const toggleEditor = () => {
    setShowEditor(!showEditor)
  }

  const handleSubmit = () => {
    updateNote()
      .then(res => {
        setMessage('Your note was saved')
        refetchNote()
      })
      .catch(err => console.log(err.message))
  }

  return (
    <Styled.PageContainer>
      <Styled.DetailBack>
        <Link to="/notes">
          <ChevronIcon />
        </Link>
      </Styled.DetailBack>

      {error ? (
        <PageError>{error.message}</PageError>
      ) : errorEdit ? (
        <PageError>{errorEdit.message}</PageError>
      ) : loading || loadingEdit ? (
        <PageLoading />
      ) : (
        <>
          <Styled.DetailHeader editorActive={showEditor}>
            <Styled.DetailTitle
              placeholder="Title for the note"
              value={noteTitle}
              onChange={e => setNoteTitle(e.target.value)}
            />
            <EditIcon onClick={toggleEditor} />
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
