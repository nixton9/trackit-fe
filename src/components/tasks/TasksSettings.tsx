import React, { useState, useEffect, Dispatch, SetStateAction } from 'react'
import Drawer from '../misc/Drawer'
import { CategoryEditor } from './CategoryEditor'
import { SelectMenu } from '../misc/SelectMenu'
import { NotificationTypes, notificationState } from '../misc/Notification'
import { alertState } from '../misc/Alert'
import { Styled } from '../../styles/Settings.styles'
import { useToggleElement } from '../../utils/useToggleElement'
import { CATEGORIES, TASKS } from '../../utils/queries'
import { ReactComponent as SettingsIcon } from '../../assets/icons/settings.svg'
import { ReactComponent as PlusIcon } from '../../assets/icons/plus.svg'
import { ReactComponent as MinusIcon } from '../../assets/icons/minus.svg'
import { TaskCategory } from '../../utils/ModuleTypes'
import { SortBySettings, sortByOptions } from '../../utils/SettingsTypes'
import { useSetRecoilState } from 'recoil'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useHistory } from 'react-router-dom'

const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id) {
      id_category
    }
  }
`

type TasksSettingsProps = {
  categories: TaskCategory[]
  sortBy: string
  setSortBy: Dispatch<SetStateAction<SortBySettings>>
}

const TasksSettings: React.FC<TasksSettingsProps> = ({
  categories,
  sortBy,
  setSortBy
}) => {
  const [showCategoryEditor, setShowCategoryEditor] = useState(false)
  const [activeCategory, setActiveCategory] = useState<TaskCategory | null>(
    null
  )

  const setNotification = useSetRecoilState(notificationState)
  const setAlert = useSetRecoilState(alertState)

  const history = useHistory()

  const [open, setOpen, overlayEl] = useToggleElement(() =>
    setShowCategoryEditor(false)
  )

  const { refetch: refetchCategories } = useQuery(CATEGORIES, {
    fetchPolicy: 'network-only'
  })
  const { refetch: refetchTasks } = useQuery(TASKS)

  const [deleteCategory] = useMutation(DELETE_CATEGORY)

  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSortBy(e.target.value as SortBySettings)

  const handleCategoryClick = (category: TaskCategory) => {
    setActiveCategory(category)
    setShowCategoryEditor(true)
  }

  const handlePlusClick = () => {
    if (showCategoryEditor) {
      setShowCategoryEditor(false)
    } else {
      setActiveCategory(null)
      setShowCategoryEditor(true)
    }
  }

  const handleDeleteType = (
    categoryId: string | number,
    categoryName: string
  ) => {
    deleteCategory({
      variables: {
        id: categoryId
      }
    })
      .then(res => {
        setNotification({
          text: `Inbox '${categoryName}' was deleted`,
          type: NotificationTypes.Success
        })
        refetchCategories()
        refetchTasks()
      })
      .catch(err =>
        setNotification({
          text: 'There was a problem, please try again',
          type: NotificationTypes.Error
        })
      )
  }

  const handleDeleteTypeConfirm = (
    categoryId: string | number,
    categoryName: string
  ) => {
    setShowCategoryEditor(false)
    setAlert({
      text: 'This inbox will be removed',
      onConfirm: () => handleDeleteType(categoryId, categoryName)
    })
  }

  useEffect(() => {
    history.push(`#`)

    window.onpopstate = (e: any) => {
      setOpen(false)
    }
  }, [history, setOpen])

  return (
    <>
      <SettingsIcon
        className="settings-icon"
        onClick={() => setOpen(true)}
        data-test-id="tasks-settings-icon"
      />

      <Drawer
        title="Settings"
        open={open}
        setOpen={setOpen}
        overlayRef={overlayEl}
      >
        <>
          <Styled.SettingsBlock>
            <Styled.SettingsBlock__Label htmlFor="sort-by">
              Sort by
            </Styled.SettingsBlock__Label>
            <Styled.SettingsBlock__Input>
              <SelectMenu
                id="sort-by"
                value={sortBy}
                onChange={handleSortByChange}
                options={sortByOptions}
              />
            </Styled.SettingsBlock__Input>
          </Styled.SettingsBlock>

          <Styled.SettingsBlock>
            <Styled.SettingsBlock__Label>Inboxes</Styled.SettingsBlock__Label>
            <Styled.SettingsBlock__Categories>
              {categories &&
                categories.map(cat => (
                  <Styled.SettingsBlock__Category
                    color={cat.color}
                    key={cat.id}
                  >
                    <div
                      className="inner"
                      onClick={() => handleCategoryClick(cat)}
                    >
                      {cat.name}
                    </div>
                    <span
                      className="delete"
                      onClick={() => handleDeleteTypeConfirm(cat.id, cat.name)}
                    >
                      +
                    </span>
                  </Styled.SettingsBlock__Category>
                ))}
              <Styled.SettingsBlock__Icon
                className="mbl-click"
                onClick={handlePlusClick}
                data-test-id="categories-add-icon"
              >
                {showCategoryEditor ? <MinusIcon /> : <PlusIcon />}
              </Styled.SettingsBlock__Icon>
            </Styled.SettingsBlock__Categories>
          </Styled.SettingsBlock>

          {showCategoryEditor && (
            <CategoryEditor
              category={activeCategory}
              closeEditor={() => setShowCategoryEditor(false)}
            />
          )}
        </>
      </Drawer>
    </>
  )
}

export default TasksSettings
