import React, { useState } from 'react'
import Drawer from '../misc/Drawer'
import { SelectMenu } from '../misc/SelectMenu'
import { Styled } from '../../styles/Settings.styles'
import { useToggleElement } from '../../utils/useToggleElement'
import { ReactComponent as SettingsIcon } from '../../assets/icons/settings.svg'

const sortByOptions = [
  { val: 'date', label: 'Date' },
  { val: 'alphabetical', label: 'Alphabetical Order' }
]

const HabitsSettings: React.FC = () => {
  const [open, setOpen, overlayEl] = useToggleElement()
  const [sortBy, setSortBy] = useState('date')

  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSortBy(e.target.value)

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
      </Drawer>
    </>
  )
}

export default HabitsSettings
