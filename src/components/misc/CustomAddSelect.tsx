import React, { useState, ReactElement } from 'react'
import { SelectMenu, SelectMenuProps } from './SelectMenu'

interface CustomAddSelectProps extends SelectMenuProps {
  icon?: ReactElement
}

export const CustomAddSelect: React.FC<CustomAddSelectProps> = ({
  value,
  options,
  id,
  itemClass,
  onChange,
  icon
}) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false)

  const handleSelectOpen = () => {
    setIsSelectOpen(true)
  }

  const handleSelectClose = () => {
    setIsSelectOpen(false)
  }

  return (
    <>
      <span onClick={handleSelectOpen}>{icon}</span>
      <SelectMenu
        id={id}
        value={value}
        open={isSelectOpen}
        onOpen={handleSelectOpen}
        onClose={handleSelectClose}
        onChange={onChange}
        options={options}
        itemClass={itemClass}
      />
    </>
  )
}
