import React, { useState, useEffect } from 'react'
import { SelectMenu } from '../misc/SelectMenu'
import { SubmitButton, IconType } from '../misc/SubmitButton'
import { LoadingSpinner } from '../misc/LoadingSpinner'
import { NotificationTypes, notificationState } from '../misc/Notification'
import { NoteTag } from '../../utils/ModuleTypes'
import { TAGS } from '../../utils/queries'
import { ADD_TAG_TO_NOTE, CREATE_TAG, UPDATE_TAG } from '../../utils/mutations'
import { Styled } from '../../styles/TagEditor.styles'
import { theme } from '../../styles/theme'
import { useMutation, useQuery } from '@apollo/client'
import { useSetRecoilState } from 'recoil'

type TagEditorProps = {
  tag: NoteTag | null
  closeEditor: () => void
  noteId?: string | number
  refetchQuery?: any
  showClose?: boolean
}

export const TagEditor: React.FC<TagEditorProps> = ({
  tag,
  noteId,
  closeEditor,
  refetchQuery,
  showClose
}) => {
  const [name, setName] = useState('')
  const [color, setColor] = useState(theme.categories.blue)
  const [isEdit, setIsEdit] = useState(false)

  const { refetch: refetchTags } = useQuery(TAGS)
  const [addTagToNote] = useMutation(ADD_TAG_TO_NOTE)
  const [createTag, { loading }] = useMutation(CREATE_TAG, {
    variables: { name: name, color: color }
  })
  const [updateTag, { loading: loadingUpdate }] = useMutation(UPDATE_TAG, {
    variables: { id: tag?.id, name: name, color: color }
  })

  const setNotification = useSetRecoilState(notificationState)

  const cleanData = () => {
    setName('')
    setColor(theme.categories.blue)
    setIsEdit(false)
    closeEditor()
  }

  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault()
    if (name && color) {
      if (isEdit) {
        updateTag()
          .then(res => {
            setNotification({
              text: `Tag was successfully updated`,
              type: NotificationTypes.Success
            })
            refetchTags()
            cleanData()
          })
          .catch(err => {
            setNotification({
              text:
                err.message === 'duplicated'
                  ? 'A tag with this name already exists'
                  : 'There was a problem, please try again',
              type: NotificationTypes.Error
            })
            cleanData()
          })
      } else {
        createTag()
          .then(res => {
            if (noteId && res.data) {
              addTagToNote({
                variables: { note: noteId, tag: res.data.createTag.id_tag }
              })
                .then(res => {
                  setNotification({
                    text: `Tag was successfully added`,
                    type: NotificationTypes.Success
                  })
                  refetchQuery && refetchQuery()
                  cleanData()
                })
                .catch(err => {
                  setNotification({
                    text: 'There was a problem, please try again',
                    type: NotificationTypes.Error
                  })
                })
            } else {
              setNotification({
                text: `New tag created '${name}'`,
                type: NotificationTypes.Success
              })
              refetchTags()
              cleanData()
            }
          })
          .catch(err => {
            setNotification({
              text:
                err.message === 'duplicated'
                  ? 'A tag with this name already exists'
                  : 'There was a problem, please try again',
              type: NotificationTypes.Error
            })
            cleanData()
          })
      }
    } else {
      setNotification({
        text: `You need to insert a name and a color for a tag`,
        type: NotificationTypes.Error
      })
    }
  }

  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setColor(e.target.value)

  const colorOptions = Object.keys(theme.categories).map(cat => ({
    label: cat,
    // @ts-ignore
    val: theme.categories[cat]
  }))

  const selectOptions = [
    { label: 'Tag color', val: '', disabled: true },
    ...colorOptions
  ]

  useEffect(() => {
    if (tag) {
      setName(tag.name)
      setColor(tag.color)
      setIsEdit(true)
    } else {
      setName('')
      setColor(theme.categories.blue)
      setIsEdit(false)
    }
  }, [tag])

  const isLoading = loading || loadingUpdate
  return (
    <Styled.TagEditorContainer>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <form onSubmit={handleSubmit}>
          <Styled.TagEditorInput
            value={name}
            placeholder={'Tag name'}
            onChange={e => setName(e.target.value)}
            data-test-id="tags-name-input"
          />
          <Styled.TagEditorSelect>
            <SelectMenu
              id="tag-color"
              value={color}
              onChange={handleColorChange}
              options={selectOptions}
              isColorPicker
            />
          </Styled.TagEditorSelect>
          <SubmitButton icon={IconType.CHECK} />
          {showClose && (
            <span className="close" onClick={closeEditor}>
              +
            </span>
          )}
        </form>
      )}
    </Styled.TagEditorContainer>
  )
}
