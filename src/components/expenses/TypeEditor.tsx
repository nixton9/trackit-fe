import React, { useState, useEffect } from 'react'
import { SelectMenu } from '../misc/SelectMenu'
import { SubmitButton, IconType } from '../misc/SubmitButton'
import { LoadingSpinner } from '../misc/LoadingSpinner'
import { NotificationTypes, notificationState } from '../misc/Notification'
import { ExpenseType } from '../../utils/ModuleTypes'
import { TYPES } from '../../utils/queries'
import { Styled } from '../../styles/TagEditor.styles'
import { theme } from '../../styles/theme'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useSetRecoilState } from 'recoil'

const CREATE_TYPE = gql`
  mutation CreateType($name: String!, $color: String!) {
    createType(name: $name, color: $color) {
      id_type
    }
  }
`

const UPDATE_TYPE = gql`
  mutation UpdateType(
    $id: ID!
    $name: String
    $color: String
    $onlyColor: Boolean
  ) {
    updateType(id: $id, name: $name, color: $color, onlyColor: $onlyColor) {
      id_type
    }
  }
`

type TypeEditorProps = {
  type?: ExpenseType | null
  closeEditor: () => void
  onCreateCallback?: (id: string) => void
  removeSelection?: () => void
  isModal?: boolean
}

export const TypeEditor: React.FC<TypeEditorProps> = ({
  type,
  isModal,
  closeEditor,
  onCreateCallback,
  removeSelection
}) => {
  const [name, setName] = useState('')
  const [color, setColor] = useState(theme.categories.blue)
  const [isEdit, setIsEdit] = useState(false)

  const { refetch: refetchTypes } = useQuery(TYPES)
  const [createType, { loading }] = useMutation(CREATE_TYPE, {
    variables: { name: name, color: color }
  })
  const [updateType, { loading: loadingUpdate }] = useMutation(UPDATE_TYPE, {
    variables: {
      id: type?.id,
      name: name,
      color: color,
      onlyColor: name === type?.name
    }
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
        updateType()
          .then(res => {
            setNotification({
              text: `Category was successfully updated`,
              type: NotificationTypes.Success
            })
            refetchTypes()
            cleanData()
          })
          .catch(err => {
            setNotification({
              text:
                err.message === 'duplicated'
                  ? 'A category with this name already exists'
                  : 'There was a problem, please try again',
              type: NotificationTypes.Error
            })
            cleanData()
          })
      } else {
        createType()
          .then(res => {
            setNotification({
              text: `New category created '${name}'`,
              type: NotificationTypes.Success
            })
            onCreateCallback && onCreateCallback(res.data.createType.id_type)
            refetchTypes()
            cleanData()
          })
          .catch(err => {
            setNotification({
              text:
                err.message === 'duplicated'
                  ? 'A category with this name already exists'
                  : 'There was a problem, please try again',
              type: NotificationTypes.Error
            })
            cleanData()
          })
      }
    } else {
      setNotification({
        text: `You need to insert a name and a color for a category`,
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
    { label: 'Category color', val: '', disabled: true },
    ...colorOptions
  ]

  const closeModalEditor = () => {
    closeEditor()
    removeSelection && removeSelection()
  }

  useEffect(() => {
    if (type) {
      setName(type.name)
      setColor(type.color)
      setIsEdit(true)
    } else {
      setName('')
      setColor(theme.categories.blue)
      setIsEdit(false)
    }
  }, [type])

  const isLoading = loading || loadingUpdate

  return (
    <Styled.TagEditorContainer className={isModal ? 'is-modal' : ''}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {isModal && (
            <span className="close mbl-click" onClick={closeModalEditor}>
              +
            </span>
          )}
          <form onSubmit={handleSubmit}>
            <Styled.TagEditorInput
              value={name}
              placeholder={'Category name'}
              onChange={e => setName(e.target.value)}
              data-test-id="categories-name-input"
            />
            <Styled.TagEditorSelect>
              <SelectMenu
                id="type-color"
                value={color}
                onChange={handleColorChange}
                options={selectOptions}
                isColorPicker
              />
            </Styled.TagEditorSelect>
            <SubmitButton icon={IconType.CHECK} />
          </form>
        </>
      )}
    </Styled.TagEditorContainer>
  )
}
