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
import { isSameMonth, isSameYear, parseDate } from './dateHelpers'
import { subDays, isSameDay } from 'date-fns'

// HABITS STATS

type CurrentHabit = Habit | null | undefined
type DayLength = number | undefined

export const getSuccessfulDays = (currHabit: CurrentHabit) => {
  return currHabit
    ? currHabit.days.filter(day => day.state === DayState.DONE).length
    : undefined
}

export const getNotSuccessfulDays = (currHabit: CurrentHabit) => {
  return currHabit
    ? currHabit.days.filter(day => day.state === DayState.NOTDONE).length
    : undefined
}

export const getBlankDays = (currHabit: CurrentHabit) => {
  return currHabit
    ? currHabit.days.filter(day => day.state === DayState.BLANK).length
    : undefined
}

export const getSuccessRate = (
  currHabit: CurrentHabit,
  successfulDays: DayLength
) => {
  return currHabit && successfulDays
    ? `${((100 * successfulDays) / currHabit.days.length).toFixed(0)}%`
    : '-'
}

export const getHabitsPieChartData = (
  currHabit: CurrentHabit,
  successfulDays: DayLength,
  notSuccessfulDays: DayLength,
  blankDays: DayLength
) => {
  return currHabit && successfulDays && notSuccessfulDays && blankDays
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
        per: ((100 * cat.value) / currHabit.days.length).toFixed(0)
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
  const orderedDays = days
    .slice()
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  let chunks: any = []

  orderedDays.forEach((day, i) => {
    if (
      day.state === DayState.DONE &&
      orderedDays[i - 1] &&
      orderedDays[i - 1].state === DayState.DONE
    ) {
      chunks[chunks.length - 1].push(day)
    } else if (day.state === DayState.DONE) {
      chunks.push([day])
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
