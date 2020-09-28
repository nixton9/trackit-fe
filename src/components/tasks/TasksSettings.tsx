import React, { useState, Dispatch, SetStateAction } from 'react'
import Drawer from '../misc/Drawer'
import { SelectMenu } from '../misc/SelectMenu'
import { Styled } from '../../styles/Settings.styles'
import { useToggleElement } from '../../utils/useToggleElement'
import { ReactComponent as SettingsIcon } from '../../assets/icons/settings.svg'
import { ReactComponent as PlusIcon } from '../../assets/icons/plus.svg'
import { TaskCategory } from '../../utils/ModuleTypes'
import { SortBySettings } from '../../utils/SettingsTypes'

const sortByOptions = [
  { val: SortBySettings.DATE, label: 'Date' },
  { val: SortBySettings.ALPHABETICAL, label: 'Alphabetical Order' }
]

const fontSizeOptions = [
  { val: 'small', label: 'Small' },
  { val: 'medium', label: 'Medium' },
  { val: 'large', label: 'Large' }
]

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
  const [open, setOpen, overlayEl] = useToggleElement()
  const [fontSize, setFontSize] = useState('medium')

  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSortBy(e.target.value as SortBySettings)

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setFontSize(e.target.value)

  return (
    <>
      <SettingsIcon className="settings-icon" onClick={() => setOpen(true)} />

      <Drawer title="Settings" open={open} overlayRef={overlayEl}>
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
          <Styled.SettingsBlock__Label htmlFor="font-size">
            Font size
          </Styled.SettingsBlock__Label>
          <Styled.SettingsBlock__Input>
            <SelectMenu
              id="font-size"
              value={fontSize}
              onChange={handleFontSizeChange}
              options={fontSizeOptions}
            />
          </Styled.SettingsBlock__Input>
        </Styled.SettingsBlock>

        <Styled.SettingsBlock>
          <Styled.SettingsBlock__Label>Categories</Styled.SettingsBlock__Label>
          <Styled.SettingsBlock__Categories>
            {categories &&
              categories.map(cat => (
                <Styled.SettingsBlock__Category color={cat.color} key={cat.id}>
                  {cat.name}
                </Styled.SettingsBlock__Category>
              ))}
            <Styled.SettingsBlock__Icon>
              <PlusIcon />
            </Styled.SettingsBlock__Icon>
          </Styled.SettingsBlock__Categories>
        </Styled.SettingsBlock>
      </Drawer>
    </>
  )
}

export default TasksSettings
