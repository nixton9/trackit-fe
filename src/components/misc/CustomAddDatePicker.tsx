import React, { forwardRef } from 'react'
import { ReactComponent as CalendarIcon } from '../../assets/icons/calendar.svg'

export const CustomAddDatePicker = forwardRef(
  ({ onClick, value, onChange, showIcon = true }: any, ref: any) => (
    <>
      {showIcon && <CalendarIcon onClick={onClick} />}
      <input
        type="text"
        value={value}
        onClick={onClick}
        onChange={onChange}
        ref={ref}
      />
    </>
  )
)
