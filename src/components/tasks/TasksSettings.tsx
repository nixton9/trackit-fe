import React, { useState } from 'react'
import Drawer from '../misc/Drawer'
import { SelectMenu } from '../misc/SelectMenu'
import { Styled } from '../../styles/Settings.styles'
import { useToggleElement } from '../../utils/useToggleElement'
import { ReactComponent as SettingsIcon } from '../../assets/icons/settings.svg'
import { ReactComponent as PlusIcon } from '../../assets/icons/plus.svg'
import { TaskCategory } from '../../utils/ModuleTypes'

const sortByOptions = [
  { val: 'date', label: 'Date' },
  { val: 'alphabetical', label: 'Alphabetical Order' }
]

const fontSizeOptions = [
  { val: 'small', label: 'Small' },
  { val: 'medium', label: 'Medium' },
  { val: 'large', label: 'Large' }
]

type TaskSettingsProps = {
  categories: TaskCategory[]
}

const TaskSettings: React.FC<TaskSettingsProps> = ({ categories }) => {
  const [open, setOpen, overlayEl] = useToggleElement()
  const [sortBy, setSortBy] = useState('date')
  const [fontSize, setFontSize] = useState('medium')

  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSortBy(e.target.value)

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

export default TaskSettings
