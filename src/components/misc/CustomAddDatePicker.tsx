import React, { forwardRef } from 'react'
import { ReactComponent as CalendarIcon } from '../../assets/icons/calendr.svg'

export const CustomAddDatePicker = forwardRef(
  ({ onClick, value, onChange }: any, ref: any) => (
    <>
      <CalendarIcon onClick={onClick} />
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
