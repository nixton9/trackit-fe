import {
  DayState,
  Day,
  Habit,
  Expense,
  ExpenseType,
  Currencies
} from './ModuleTypes'
import { theme } from '../styles/theme'
import { showCurrencySym, months } from './globalHelpers'
import {
  isSameMonth,
  isSameYear,
  parseDate,
  parseDateInverse
} from './dateHelpers'
import {
  subDays,
  isSameDay,
  differenceInCalendarDays,
  isBefore
} from 'date-fns'

// HABITS STATS

type CurrentHabit = Habit | null | undefined
type DayLength = number

export const getSuccessfulDays = (currHabit: CurrentHabit) => {
  return currHabit
    ? currHabit.days.filter(day => day.state === DayState.DONE).length
    : 0
}

export const getNotSuccessfulDays = (currHabit: CurrentHabit) => {
  return currHabit
    ? currHabit.days.filter(day => day.state === DayState.NOTDONE).length
    : 0
}

export const getBlankDays = (currHabit: CurrentHabit) => {
  return currHabit
    ? currHabit.days.filter(day => day.state === DayState.BLANK).length
    : 0
}

export const getTotalDays = (currHabit: CurrentHabit) => {
  if (currHabit && currHabit.days.length) {
    const firstDay = currHabit.days[0].date
    if (
      isBefore(
        parseDate(parseDateInverse(firstDay)),
        parseDate(parseDateInverse(currHabit.date))
      )
    ) {
      return differenceInCalendarDays(
        new Date(),
        parseDate(parseDateInverse(firstDay))
      )
    } else {
      return differenceInCalendarDays(
        new Date(),
        parseDate(parseDateInverse(currHabit.date))
      )
    }
  } else if (currHabit) {
    return differenceInCalendarDays(
      new Date(),
      parseDate(parseDateInverse(currHabit.date))
    )
  }
  return 0
}

export const getSuccessRate = (
  successfulDays: DayLength,
  totalDays: DayLength
) => {
  return totalDays && successfulDays
    ? `${((100 * successfulDays) / totalDays).toFixed(0)}%`
    : '-'
}

export const getHabitsPieChartData = (
  currHabit: CurrentHabit,
  successfulDays: DayLength,
  notSuccessfulDays: DayLength,
  blankDays: DayLength,
  totalDays: DayLength
) => {
  return currHabit
    ? [
        {
          name: 'Done',
          value: successfulDays,
          color: theme.habitsGreen
        },
        {
          name: 'Not done',
          value: notSuccessfulDays,
          color: theme.habitsRed
        },
        {
          name: 'Empty',
          value: blankDays,
          color: theme.categories.grey
        }
      ].map(cat => ({
        ...cat,
        per: ((100 * cat.value) / totalDays).toFixed(0)
      }))
    : []
}

export const getCurrentStreak = (days: Day[]) => {
  let counter = 0
  const today = new Date()

  if (
    days.filter(
      (hDay: Day) =>
        isSameDay(parseDate(hDay.date), today) && hDay.state === DayState.DONE
    )[0]
  ) {
    counter = 1

    const checkHabitDays = (hDay: Day) =>
      isSameDay(parseDate(hDay.date), subDays(today, counter)) &&
      hDay.state === DayState.DONE

    while (days.filter(checkHabitDays)[0]) {
      counter++
    }
  }
  return counter
}

export const getLongestStreak = (days: Day[]) => {
  let chunks: any = []

  days.forEach((day, i) => {
    if (days[i + 1] && days[i + 1].date === day.date) {
    } else {
      if (
        day.state === DayState.DONE &&
        days[i - 1] &&
        days[i - 1].state === DayState.DONE
      ) {
        chunks[chunks.length - 1].push(day)
      } else if (day.state === DayState.DONE) {
        chunks.push([day])
      }
    }
  })

  if (chunks.length) {
    const longestStreakIndex = chunks
      .map((chunk: any) => chunk.length)
      .indexOf(Math.max(...chunks.map((chunk: any) => chunk.length)))
    return chunks[longestStreakIndex].length
  }
  return 0
}

// EXPENSES STATS
type ExpensesData = { expenses: Expense[] }
type CategoriesData = { types: ExpenseType[] }

export const getBarChartData = (
  data: ExpensesData,
  selectedYear: string,
  currency: Currencies
) => {
  return data
    ? months
        .map(month => ({
          ...month,
          name: month.name.substring(0, 3),
          monthLabel: `${month.name} ${selectedYear}`,
          value: data.expenses
            .filter(
              exp =>
                isSameMonth(exp.date, month.id) &&
                isSameYear(exp.date, Number(selectedYear))
            )
            .reduce((acc, obj) => acc + obj.value, 0)
        }))
        .map(month => ({
          ...month,
          displayValue: `${month.value}${showCurrencySym(currency)}`
        }))
    : []
}

export const getCategoriesData = (
  categories: CategoriesData,
  data: ExpensesData,
  selectedYear: string
) => {
  return categories && data
    ? data.expenses
        .filter(exp => isSameYear(exp.date, Number(selectedYear)))
        .some(exp => !exp.type)
      ? [
          ...categories.types.filter(cat =>
            data.expenses.some(
              exp =>
                exp.type &&
                exp.type.id === cat.id &&
                isSameYear(exp.date, Number(selectedYear))
            )
          ),
          { id: '0', name: 'Other', color: theme.categories.grey }
        ]
      : [
          ...categories.types.filter(cat =>
            data.expenses.some(
              exp =>
                exp.type &&
                exp.type.id === cat.id &&
                isSameYear(exp.date, Number(selectedYear))
            )
          )
        ]
    : []
}

export const getExpensesPieChartData = (
  categories: CategoriesData,
  data: ExpensesData,
  categoriesData: ExpenseType[],
  selectedYear: string,
  currency: Currencies,
  totalExpensesVal: number | null
) => {
  return categories && data
    ? categoriesData
        .map(cat => ({
          name: cat.name,
          value:
            cat.id === '0'
              ? data.expenses
                  .filter(
                    exp =>
                      !exp.type && isSameYear(exp.date, Number(selectedYear))
                  )
                  .reduce((acc, obj) => acc + obj.value, 0)
              : data.expenses
                  .filter(
                    exp =>
                      exp.type &&
                      exp.type.id === cat.id &&
                      isSameYear(exp.date, Number(selectedYear))
                  )
                  .reduce((acc, obj) => acc + obj.value, 0),
          color: cat.color
        }))
        .map(cat => ({
          ...cat,
          displayValue: `${cat.value}${showCurrencySym(currency)}`,
          per: totalExpensesVal
            ? ((100 * cat.value) / totalExpensesVal).toFixed(1)
            : 0
        }))
    : []
}

export const getTopExpenses = (data: ExpensesData, selectedYear: string) => {
  return data
    ? [...data.expenses]
        .filter(exp => isSameYear(exp.date, Number(selectedYear)))
        .sort((a, b) => b.value - a.value)
        .slice(0, 10)
    : []
}
