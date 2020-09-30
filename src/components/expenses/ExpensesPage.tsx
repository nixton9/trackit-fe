import React, { useState } from 'react'
import ExpensesSettings from './ExpensesSettings'
import SingleExpense from './SingleExpense'
import DatePickerInput from '../misc/DatePickerInput'
import { PageLoading } from '../misc/PageLoading'
import { PageError } from '../misc/PageError'
import { Styled } from '../../styles/Page.styles'
import { Expense } from '../../utils/ModuleTypes'
import { EXPENSES, TYPES } from '../../utils/queries'
import { displayDateString, parseDate } from '../../utils/dateHelpers'
import { startOfMonth, endOfMonth, isWithinInterval } from 'date-fns'
import { useQuery } from '@apollo/client'

const ExpensesPage: React.FC = () => {
  const { loading, error, data } = useQuery(EXPENSES)
  const { data: types } = useQuery(TYPES)

  const [startDate, setStartDate] = useState(startOfMonth(new Date()))
  const [endDate, setEndDate] = useState(endOfMonth(new Date()))

  const expensesDays: [] | string[] = data
    ? Array.from(
        new Set(
          data.expenses.map((expense: Expense) => expense.date.substring(0, 10))
        )
      )
    : []

  const visibleExpensesDay = data
    ? expensesDays
        .filter((day: string) =>
          isWithinInterval(parseDate(day), {
            start: startDate,
            end: endDate
          })
        )
        .sort(
          (a: string, b: string) =>
            new Date(b).getTime() - new Date(a).getTime()
        )
    : []

  const totalExpensesVal = data
    ? data.expenses
        .filter((expense: Expense) =>
          visibleExpensesDay.includes(expense.date.substring(0, 10))
        )
        .reduce((acc: number, obj: Expense) => acc + obj.value, 0)
    : 0

  return (
    <Styled.PageContainer>
      <Styled.PageTitle>Expenses</Styled.PageTitle>
      <Styled.PageHeader>
        <Styled.PageHeader__View>
          <Styled.PageHeader__View__Dropdown>
            <DatePickerInput
              date={startDate}
              maxDate={endDate}
              setDate={setStartDate}
            />
            <span>-</span>
            <DatePickerInput
              date={endDate}
              minDate={startDate}
              setDate={setEndDate}
            />
            {/* <ChevronIcon /> */}
          </Styled.PageHeader__View__Dropdown>
          <Styled.PageHeader__View__Counter>
            {totalExpensesVal}$
          </Styled.PageHeader__View__Counter>
        </Styled.PageHeader__View>
        <Styled.PageHeader__Settings>
          <ExpensesSettings categories={types ? types.types : []} />
        </Styled.PageHeader__Settings>
      </Styled.PageHeader>

      <Styled.PageContent>
        {error ? (
          <PageError>{error.message}</PageError>
        ) : loading ? (
          <PageLoading />
        ) : visibleExpensesDay.length ? (
          (visibleExpensesDay as string[]).map(day => (
            <Styled.PageContent__Day key={day}>
              <Styled.PageContent__Day__Title>
                {displayDateString(day)}
              </Styled.PageContent__Day__Title>
              <Styled.PageContent__Day__Expenses>
                {(data.expenses as Expense[])
                  .filter(expense => expense.date.substring(0, 10) === day)
                  .map(expense => (
                    <SingleExpense
                      key={expense.id}
                      id={expense.id}
                      title={expense.title}
                      date={expense.date}
                      value={expense.value}
                      type={expense.type}
                    />
                  ))}
              </Styled.PageContent__Day__Expenses>
            </Styled.PageContent__Day>
          ))
        ) : (
          <Styled.PageContent__NoData>
            <p>No expenses on this date.</p>
          </Styled.PageContent__NoData>
        )}
      </Styled.PageContent>
    </Styled.PageContainer>
  )
}

export default ExpensesPage
