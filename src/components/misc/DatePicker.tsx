import React, { Dispatch, SetStateAction } from 'react'
import DatePicker from 'react-datepicker'
import { Styled } from '../../styles/DatePicker.styles'
import 'react-datepicker/dist/react-datepicker.css'

type DatePickerProps = {
  date: Date
  setDate: Dispatch<SetStateAction<Date>>
  minDate?: Date
  maxDate?: Date
}

const DatePickerInput: React.FC<DatePickerProps> = ({
  date,
  setDate,
  minDate,
  maxDate
}) => {
  return (
    <Styled.DatePickerContainer>
      <DatePicker
        selected={date}
        onChange={(date: any) => setDate(date)}
        dateFormat="d MMM"
        minDate={minDate}
        maxDate={maxDate}
      />
    </Styled.DatePickerContainer>
  )
}

export default DatePickerInput
