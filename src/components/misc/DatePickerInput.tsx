import React, { Dispatch, SetStateAction, ReactElement } from 'react'
import DatePicker from 'react-datepicker'
import { Styled } from '../../styles/DatePicker.styles'
import 'react-datepicker/dist/react-datepicker.css'

type DatePickerProps = {
  date: Date
  setDate: Dispatch<SetStateAction<Date>>
  minDate?: Date
  maxDate?: Date
  classname?: string
  customInput?: ReactElement
}

const DatePickerInput: React.FC<DatePickerProps> = ({
  date,
  setDate,
  minDate,
  maxDate,
  classname,
  customInput
}) => {
  return (
    <Styled.DatePickerContainer className={classname}>
      <DatePicker
        selected={date}
        onChange={(date: Date) => setDate(date)}
        dateFormat="d MMM"
        minDate={minDate}
        maxDate={maxDate}
        customInput={customInput}
      />
    </Styled.DatePickerContainer>
  )
}

export default DatePickerInput
