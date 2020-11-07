import React, { useState, useEffect } from 'react'
import { SelectMenu } from '../misc/SelectMenu'
import { AddSubmitButton } from '../misc/Add'
import { LoadingSpinner } from '../misc/LoadingSpinner'
import { NotificationTypes, notificationState } from '../misc/Notification'
import { NoteTag } from '../../utils/ModuleTypes'
import { TAGS } from '../../utils/queries'
import { Styled } from '../../styles/TagEditor.styles'
import theme from '../../styles/theme'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useSetRecoilState } from 'recoil'

const CREATE_TAG = gql`
  mutation CreateTag($name: String!, $color: String!) {
    createTag(name: $name, color: $color) {
      id_tag
    }
  }
`

const UPDATE_TAG = gql`
  mutation UpdateTag($id: ID!, $name: String, $color: String) {
    updateTag(id: $id, name: $name, color: $color) {
      id_tag
    }
  }
`

type TagEditorProps = {
  tag: NoteTag | null
  closeEditor: () => void
}

export const TagEditor: React.FC<TagEditorProps> = ({ tag, closeEditor }) => {
  const [name, setName] = useState('')
  const [color, setColor] = useState(theme.categories.blue)
  const [isEdit, setIsEdit] = useState(false)

  const { refetch: refetchTags } = useQuery(TAGS)
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
              text: 'There was a problem, please try again',
              type: NotificationTypes.Error
            })
            cleanData()
          })
      } else {
        createTag()
          .then(res => {
            setNotification({
              text: `New tag created '${name}'`,
              type: NotificationTypes.Success
            })
            refetchTags()
            cleanData()
          })
          .catch(err => {
            setNotification({
              text: 'There was a problem, please try again',
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

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <Styled.TagEditorContainer>
      <form onSubmit={handleSubmit}>
        <Styled.TagEditorInput
          value={name}
          placeholder={'Tag name'}
          onChange={e => setName(e.target.value)}
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
        <AddSubmitButton plusIcon={!isEdit} />
      </form>
    </Styled.TagEditorContainer>
  )
}
