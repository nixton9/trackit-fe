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
  isPast,
  getMonth,
  getYear
} from 'date-fns'
import { Day, DayState } from './ModuleTypes'

export const parseDate = (date: string) => parse(date, 'yyyy-MM-dd', new Date())

export const parseDateInverse = (date: Date | string) => {
  return typeof date === 'string'
    ? format(new Date(date), 'yyyy-MM-dd')
    : format(date, 'yyyy-MM-dd')
}

export const isDateToday = (date: string) =>
  isSameDay(parseDate(date), new Date())

export const isPastDate = (date: string) =>
  isToday(parseDate(date)) ? false : isPast(parseDate(date))

export const displayDateString = (date: string, withYear: boolean = false) => {
  if (isSameDay(parseDate(date), new Date())) {
    return 'Today'
  } else if (isSameDay(parseDate(date), addDays(new Date(), 1))) {
    return 'Tomorrow'
  } else if (isSameDay(parseDate(date), subDays(new Date(), 1))) {
    return 'Yesterday'
  } else {
    return withYear
      ? format(parseDate(date), 'dd MMM yyyy')
      : format(parseDate(date), 'dd MMM')
  }
}

export const displayDate = (date: string) => format(parseDate(date), 'dd MMM')

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
          if (isSunday(day)) {
            dayClassName += ' strike-sun'
          }
        }
        if (
          allHabitDays.filter(
            (hDay: Day) =>
              isEqual(parseDate(hDay.date), addDays(day, 1)) &&
              hDay.state === DayState.DONE
          )[0]
        ) {
          if (isSaturday(day)) {
            dayClassName += ' strike-sat'
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

export const getDayNextClass = (currState: DayState) => {
  switch (currState) {
    case null:
    case DayState.BLANK:
      return 'done'
    case DayState.DONE:
      return 'not-done'
    case DayState.NOTDONE:
      return 'blank'
  }
}

export const isSameMonth = (date: string, month: number) =>
  // getMonth starts counting months at 0 so we need add 1
  getMonth(new Date(date)) + 1 === month

export const isSameYear = (date: string, year: number) =>
  getYear(new Date(date)) === year
