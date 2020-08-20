import React from 'react'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { ReactComponent as ChevronIcon } from '../../assets/icons/chevron.svg'

type SelectMenuProps = {
  value: string
  options: { val: string | number; label: string }[]
  id: string
  itemClass?: string
  onChange: (e: any) => void
}

export const SelectMenu: React.FC<SelectMenuProps> = ({
  value,
  options,
  id,
  itemClass,
  onChange
}) => {
  return (
    <Select
      id={id}
      value={value}
      onChange={onChange}
      IconComponent={ChevronIcon}
      disableUnderline
    >
      {options.map(option => (
        <MenuItem key={option.val} value={option.val} className={itemClass}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  )
}
