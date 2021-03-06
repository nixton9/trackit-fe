import React, { useEffect, Dispatch, SetStateAction } from 'react'
import Drawer from '../misc/Drawer'
import { SelectMenu } from '../misc/SelectMenu'
import { Styled } from '../../styles/Settings.styles'
import { useToggleElement } from '../../utils/useToggleElement'
import { SortBySettings, sortByOptions } from '../../utils/SettingsTypes'
import { ReactComponent as SettingsIcon } from '../../assets/icons/settings.svg'
import { useHistory } from 'react-router-dom'

type HabitsSettingsProps = {
  sortBy: string
  setSortBy: Dispatch<SetStateAction<SortBySettings>>
}

const HabitsSettings: React.FC<HabitsSettingsProps> = ({
  sortBy,
  setSortBy
}) => {
  const [open, setOpen, overlayEl] = useToggleElement()

  const history = useHistory()

  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSortBy(e.target.value as SortBySettings)

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
        data-test-id="habits-settings-icon"
      />

      <Drawer
        title="Settings"
        open={open}
        setOpen={setOpen}
        overlayRef={overlayEl}
      >
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
