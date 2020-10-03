import {
  subDays,
  parse,
  isEqual,
  isSaturday,
  isSunday,
  isSameDay,
  addDays,
  format,
  isToday,
  isPast
} from 'date-fns'
import { Habit, Day, DayState } from './ModuleTypes'

export const parseDate = (date: string) => parse(date, 'yyyy-MM-dd', new Date())

export const parseDateInverse = (date: Date) => format(date, 'yyyy-MM-dd')

export const isDateToday = (date: string) =>
  isSameDay(parseDate(date), new Date())

export const isPastDate = (date: string) =>
  isToday(parseDate(date)) ? false : isPast(parseDate(date))

export const displayDateString = (date: string) => {
  if (isSameDay(parseDate(date), new Date())) {
    return 'Today'
  } else if (isSameDay(parseDate(date), addDays(new Date(), 1))) {
    return 'Tomorrow'
  } else if (isSameDay(parseDate(date), subDays(new Date(), 1))) {
    return 'Yesterday'
  } else {
    return format(parseDate(date), 'dd MMM')
  }
}

export const getCalendarDayInfo = (allHabitDays: Day[], day: Date) => {
  let dayClassName = ''
  let currState = null
  let dayId = null

  for (let i = 0; i < allHabitDays.length; i++) {
    if (isEqual(parseDate(allHabitDays[i].date), day)) {
      dayId = allHabitDays[i].id
      if (allHabitDays[i].state === DayState.DONE) {
        dayClassName = 'done'
        currState = DayState.DONE
        if (
          allHabitDays.filter(
            (hDay: Day) =>
              isEqual(parseDate(hDay.date), subDays(day, 1)) &&
              hDay.state === DayState.DONE
          )[0]
        ) {
          dayClassName += ' strike'
          if (isSaturday(day)) {
            dayClassName += ' strike-sat'
          } else if (isSunday(day)) {
            dayClassName += ' strike-sun'
          }
        }
      } else if (allHabitDays[i].state === DayState.NOTDONE) {
        dayClassName = 'not-done'
        currState = DayState.NOTDONE
      } else if (allHabitDays[i].state === DayState.BLANK) {
        currState = DayState.BLANK
      }
    }
  }

  return {
    dayClassName,
    currState,
    dayId
  }
}

export const getCurrentStrike = (habit: Habit) => {
  let counter = 0
  const today = new Date()

  if (
    habit.days.filter(
      (hDay: Day) =>
        isSameDay(parseDate(hDay.date), today) && hDay.state === DayState.DONE
    )[0]
  ) {
    counter = 1

    const checkHabitDays = (hDay: Day) =>
      isSameDay(parseDate(hDay.date), subDays(today, counter)) &&
      hDay.state === DayState.DONE

    while (habit.days.filter(checkHabitDays)[0]) {
      counter++
    }
  }
  return counter
}
