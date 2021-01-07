import React, { MouseEvent, ReactText } from 'react'
import { HabitHeader } from './HabitHeader'
import { Habit, DayState } from '../../utils/ModuleTypes'
import { Styled } from '../../styles/Calendar.styles'
import { getCalendarDayInfo } from '../../utils/dateHelpers'
import { addDays, startOfWeek, endOfWeek, format, isSameDay } from 'date-fns'

type CalendarProps = {
  habits: Habit[]
  currentDate: Date
  handleClickDay: (
    e: MouseEvent,
    habit: ReactText,
    clonedDay: Date,
    currState: DayState | null,
    dayId: string | number | null
  ) => void
}

export const CalendarAll: React.FC<CalendarProps> = ({
  habits,
  currentDate,
  handleClickDay
}) => {
  const daysOfWeek = () => {
    const dateFormat = 'E'
    const days = []
    let startDate = startOfWeek(currentDate)

    for (let i = 0; i < 7; i++) {
      days.push(
        <Styled.CalendarDOW__Day key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </Styled.CalendarDOW__Day>
      )
    }

    return <Styled.CalendarDOW>{days}</Styled.CalendarDOW>
  }

  const cells = (habit: Habit) => {
    const rows = []
    let days = []
    let day = startOfWeek(currentDate)
    let formattedDate = ''

    while (day <= endOfWeek(currentDate)) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'd')
        const cloneDay = day
        let { dayClassName, currState, dayId } = getCalendarDayInfo(
          habit.days,
          cloneDay
        )

        days.push(
          <Styled.CalendarDays__Cell
            key={cloneDay.toString()}
            className={
              isSameDay(day, new Date())
                ? `today ${dayClassName}`
                : dayClassName
            }
            onClick={e =>
              handleClickDay(e, habit.id, cloneDay, currState, dayId)
            }
          >
            <Styled.CalendarDays__Cell__Inner>
              {formattedDate}
            </Styled.CalendarDays__Cell__Inner>
          </Styled.CalendarDays__Cell>
        )

        day = addDays(day, 1)
      }

      rows.push(
        <Styled.CalendarHabit key={habit.id} className="single-habit">
          <HabitHeader id={habit.id} title={habit.title} />
          <Styled.CalendarDays key={day.toString()}>
            {' '}
            {days}{' '}
          </Styled.CalendarDays>
        </Styled.CalendarHabit>
      )
      days = []
    }

    return rows
  }

  return (
    <>
      {daysOfWeek()}
      {habits.map(habit => cells(habit))}
    </>
  )
}
