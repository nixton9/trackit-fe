import React, { useState } from 'react'
import { ExpensesList } from './ExpensesList'
import { ExpensesStats } from './ExpensesStats'
import { activeContentState } from '../misc/Add'
import { Walkthrough, Pages } from '../misc/Walkthrough/Walkthrough'
import { Styled } from '../../styles/Page.styles'
import { Expense, Currencies } from '../../utils/ModuleTypes'
import { EXPENSES, TYPES } from '../../utils/queries'
import { useLocalStorage } from '../../utils/useLocalStorage'
import { parseDate, parseDateInverse } from '../../utils/dateHelpers'
import ScrollLock from 'react-scrolllock'
import { startOfMonth, endOfMonth, isWithinInterval } from 'date-fns'
import { useQuery } from '@apollo/client'
import { useSetRecoilState } from 'recoil'

type ExpensesPageProps = {
  stats?: boolean
  isIos?: boolean
}

const ExpensesPage: React.FC<ExpensesPageProps> = ({ stats, isIos }) => {
  const setActiveContent = useSetRecoilState(activeContentState)

  const [showExpWT, setShowExpWT] = useLocalStorage('showExpWT', true)
  const [currency, setCurrency] = useLocalStorage('currency', Currencies.DOLLAR)

  const { loading, error, data } = useQuery(EXPENSES)
  const { data: types } = useQuery(TYPES)

  const [startDate, setStartDate] = useState(startOfMonth(new Date()))
  const [endDate, setEndDate] = useState(endOfMonth(new Date()))

  const expensesDays: [] | string[] = data
    ? Array.from(
        new Set(
          data.expenses.map((expense: Expense) =>
            parseDateInverse(expense.date)
          )
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
          visibleExpensesDay.includes(parseDateInverse(expense.date))
        )
        .reduce((acc: number, obj: Expense) => acc + obj.value, 0)
        .toFixed(2)
    : 0

  const showWalkthrough = showExpWT && !error && !loading

  return (
    <>
      <ScrollLock />
      <Styled.PageContainer className="overflow page-container">
        {stats ? (
          <ExpensesStats
            data={data}
            categories={types}
            error={error}
            loading={loading}
          />
        ) : (
          <>
            {showWalkthrough && (
              <Walkthrough
                page={Pages.EXPENSES}
                setShow={setShowExpWT}
                selectLastButOneSingle={visibleExpensesDay.length > 1}
              />
            )}

            <ExpensesList
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              totalExpensesVal={totalExpensesVal}
              visibleExpensesDay={visibleExpensesDay}
              currency={currency}
              setCurrency={setCurrency}
              data={data}
              types={types}
              error={error}
              loading={loading}
              setActiveContent={setActiveContent}
            />
          </>
        )}
      </Styled.PageContainer>
    </>
  )
}

export default ExpensesPage
