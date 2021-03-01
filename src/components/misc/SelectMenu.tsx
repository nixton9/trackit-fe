import React from 'react'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { capitalize } from '../../utils/globalHelpers'
import { ReactComponent as ChevronIcon } from '../../assets/icons/chevron.svg'
import styled from 'styled-components'

const StyledItemColor = styled.div`
  width: 1.3rem;
  height: 1.3rem;
  border-radius: 50%;
  margin-left: auto;
`

export type SelectMenuProps = {
  value: string | string[]
  options: {
    val: string | number
    label: string
    disabled?: boolean
    color?: string
    onClick?: () => void
  }[]
  id: string
  itemClass?: string
  open?: boolean
  isColorPicker?: boolean
  onChange: (e: any) => void
  onOpen?: (e: any) => void
  onClose?: (e: any) => void
}

export const SelectMenu: React.FC<SelectMenuProps> = ({
  value,
  options,
  id,
  itemClass,
  open,
  onChange,
  onOpen,
  onClose,
  isColorPicker
}) => {
  return (
    <Select
      id={id}
      value={value}
      open={open}
      onOpen={onOpen}
      onClose={onClose}
      onChange={onChange}
      IconComponent={ChevronIcon}
      disableUnderline
    >
      {options.map(option => (
        <MenuItem
          key={option.val}
          value={option.val}
          className={itemClass}
          disabled={option.disabled ? true : false}
          onClick={option.onClick}
        >
          {isColorPicker ? (
            <>
              <span>{capitalize(option.label)}</span>
              <StyledItemColor style={{ background: option.val }} />
            </>
          ) : (
            option.label
          )}
        </MenuItem>
      ))}
    </Select>
  )
}
