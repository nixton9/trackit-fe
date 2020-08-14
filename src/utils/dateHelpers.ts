import moment from 'moment'
import {
  subDays,
  parse,
  isEqual,
  isSaturday,
  isSunday,
  isSameDay
} from 'date-fns'
import { Habit } from './ModuleTypes'

export const parseDate = (date: string) => parse(date, 'yyyy-MM-dd', new Date())

export const displayDateString = (date: string) => {
  if (moment(date).isSame(moment(), 'day')) {
    return 'Today'
  } else if (moment(date).isSame(moment().add(1, 'day'), 'day')) {
    return 'Tomorrow'
  } else if (moment(date).isSame(moment().subtract(1, 'day'), 'day')) {
    return 'Yesterday'
  } else {
    return moment(date).format('DD MMM')
  }
}

export const getCalendarDayClass = (
  allHabitDays: { date: string; done: boolean }[],
  day: Date
) => {
  let className = ''

  for (let i = 0; i < allHabitDays.length; i++) {
    if (isEqual(parseDate(allHabitDays[i].date), day)) {
      if (allHabitDays[i].done) {
        className = 'done'
        if (
          allHabitDays.filter(
            (hDay: { date: string; done: boolean }) =>
              isEqual(parseDate(hDay.date), subDays(day, 1)) && hDay.done
          )[0]
        ) {
          className += ' strike'
          if (isSaturday(day)) {
            className += ' strike-sat'
          } else if (isSunday(day)) {
            className += ' strike-sun'
          }
        }
      } else {
        className = 'not-done'
      }
    }
  }

  return className
}

export const getCurrentStrike = (habit: Habit) => {
  let counter = 0
  const today = new Date()

  if (
    habit.days.filter(
      (hDay: { date: string; done: boolean }) =>
        isSameDay(parseDate(hDay.date), today) && hDay.done
    )[0]
  ) {
    counter = 1

    const checkHabitDays = (hDay: { date: string; done: boolean }) =>
      isSameDay(parseDate(hDay.date), subDays(today, counter)) && hDay.done

    while (habit.days.filter(checkHabitDays)[0]) {
      counter++
    }
  }
  return counter
}
