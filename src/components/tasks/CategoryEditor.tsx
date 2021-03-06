import React, { useState, useEffect } from 'react'
import { SelectMenu } from '../misc/SelectMenu'
import { SubmitButton, IconType } from '../misc/SubmitButton'
import { LoadingSpinner } from '../misc/LoadingSpinner'
import { NotificationTypes, notificationState } from '../misc/Notification'
import { TaskCategory } from '../../utils/ModuleTypes'
import { CATEGORIES } from '../../utils/queries'
import { Styled } from '../../styles/TagEditor.styles'
import { theme } from '../../styles/theme'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useSetRecoilState } from 'recoil'

const CREATE_CATEGORY = gql`
  mutation CreateCategory($name: String!, $color: String!) {
    createCategory(name: $name, color: $color) {
      id_category
    }
  }
`

const UPDATE_CATEGORY = gql`
  mutation UpdateCategory(
    $id: ID!
    $name: String
    $color: String
    $onlyColor: Boolean
  ) {
    updateCategory(id: $id, name: $name, color: $color, onlyColor: $onlyColor) {
      id_category
    }
  }
`

type CategoryEditorProps = {
  category?: TaskCategory | null
  closeEditor: () => void
  onCreateCallback?: (id: string) => void
  removeSelection?: () => void
  isModal?: boolean
}

export const CategoryEditor: React.FC<CategoryEditorProps> = ({
  category,
  isModal,
  closeEditor,
  removeSelection,
  onCreateCallback
}) => {
  const [name, setName] = useState('')
  const [color, setColor] = useState(theme.categories.blue)
  const [isEdit, setIsEdit] = useState(false)

  const { refetch: refetchCategories } = useQuery(CATEGORIES)
  const [createCategory, { loading }] = useMutation(CREATE_CATEGORY, {
    variables: { name: name, color: color }
  })
  const [updateCategory, { loading: loadingUpdate }] = useMutation(
    UPDATE_CATEGORY,
    {
      variables: {
        id: category?.id,
        name: name,
        color: color,
        onlyColor: name === category?.name
      }
    }
  )

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
        updateCategory()
          .then(res => {
            setNotification({
              text: `Category was successfully updated`,
              type: NotificationTypes.Success
            })
            refetchCategories()
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
        createCategory()
          .then(res => {
            setNotification({
              text: `New category created '${name}'`,
              type: NotificationTypes.Success
            })
            onCreateCallback &&
              onCreateCallback(res.data.createCategory.id_category)
            refetchCategories()
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
    if (category) {
      setName(category.name)
      setColor(category.color)
      setIsEdit(true)
    } else {
      setName('')
      setColor(theme.categories.blue)
      setIsEdit(false)
    }
  }, [category])

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
              placeholder={'Inbox name'}
              onChange={e => setName(e.target.value)}
              data-test-id="categories-name-input"
            />
            <Styled.TagEditorSelect>
              <SelectMenu
                id="cat-color"
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
