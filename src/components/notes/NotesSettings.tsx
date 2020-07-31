import React from 'react'
import Drawer from '../misc/Drawer'
import { useToggleElement } from '../../utils/useToggleElement'
import { ReactComponent as SettingsIcon } from '../../assets/icons/settings.svg'

const NotesSettings: React.FC = () => {
  const [open, setOpen, overlayEl] = useToggleElement()
  return (
    <>
      <SettingsIcon onClick={() => setOpen(true)} />
      <Drawer title="Settings" open={open} overlayRef={overlayEl}>
        <p>Settings content here</p>
      </Drawer>
    </>
  )
}

export default NotesSettings
