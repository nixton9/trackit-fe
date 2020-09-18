import React, { useState, Dispatch, SetStateAction } from 'react'
import Drawer from '../misc/Drawer'
import Tag from './Tag'
import { SelectMenu } from '../misc/SelectMenu'
import { Styled } from '../../styles/Settings.styles'
import { useToggleElement } from '../../utils/useToggleElement'
import { ReactComponent as SettingsIcon } from '../../assets/icons/settings.svg'
import { ReactComponent as PlusIcon } from '../../assets/icons/plus.svg'
import { NoteTag } from '../../utils/ModuleTypes'
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

type NotesSettingsProps = {
  tags: NoteTag[]
  sortBy: string
  setSortBy: Dispatch<SetStateAction<SortBySettings>>
}

const NotesSettings: React.FC<NotesSettingsProps> = ({
  tags,
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
          <Styled.SettingsBlock__Label>Tags</Styled.SettingsBlock__Label>
          <Styled.SettingsBlock__Tags>
            {tags &&
              tags.map(tag => (
                <Tag
                  key={tag.id}
                  id={tag.id}
                  name={tag.name}
                  color={tag.color}
                />
              ))}
            <Styled.SettingsBlock__Icon>
              <PlusIcon />
            </Styled.SettingsBlock__Icon>
          </Styled.SettingsBlock__Tags>
        </Styled.SettingsBlock>
      </Drawer>
    </>
  )
}

export default NotesSettings
