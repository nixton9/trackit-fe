import React, { useState } from 'react'
import ExpensesSettings, { currencyState } from './ExpensesSettings'
import SingleExpense from './SingleExpense'
import DatePickerInput from '../misc/DatePickerInput'
import Tooltip from 'react-tooltip-lite'
import { PageLoading } from '../misc/PageLoading'
import { PageError } from '../misc/PageError'
import { activeContentState } from '../misc/Add'
import { Styled } from '../../styles/Page.styles'
import { Expense, ModuleTypes } from '../../utils/ModuleTypes'
import { EXPENSES, TYPES } from '../../utils/queries'
import { showCurrencySym } from '../../utils/globalHelpers'
import { ReactComponent as ChevronIcon } from '../../assets/icons/chevron.svg'
import { ReactComponent as PlusIcon } from '../../assets/icons/plus.svg'
import { ReactComponent as NoDataIcon } from '../../assets/icons/nodata.svg'
import {
  displayDateString,
  parseDate,
  parseDateInverse
} from '../../utils/dateHelpers'
import { startOfMonth, endOfMonth, isWithinInterval } from 'date-fns'
import { useQuery } from '@apollo/client'
import { useSetRecoilState, useRecoilValue } from 'recoil'

const ExpensesPage: React.FC = () => {
  const setActiveContent = useSetRecoilState(activeContentState)

  const currency = useRecoilValue(currencyState)

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

  return (
    <Styled.PageContainer>
      <Styled.PageTitle>Expenses</Styled.PageTitle>
      <Styled.PageHeader>
        <Styled.PageHeader__View>
          <Styled.PageHeader__View__Dropdown>
            <div className="input-wrapper">
              <DatePickerInput
                date={startDate}
                maxDate={endDate}
                setDate={setStartDate}
              />
              <ChevronIcon />
            </div>
            <div className="input-wrapper">
              <DatePickerInput
                date={endDate}
                minDate={startDate}
                setDate={setEndDate}
              />
              <ChevronIcon />
            </div>
          </Styled.PageHeader__View__Dropdown>

          <Tooltip
            content={'Spent on this period'}
            arrow={false}
            direction={'up'}
          >
            <Styled.PageHeader__View__Counter>
              {totalExpensesVal} {currency && showCurrencySym(currency)}
            </Styled.PageHeader__View__Counter>
          </Tooltip>
        </Styled.PageHeader__View>

        <Styled.PageHeader__Settings className="mbl-click">
          <Tooltip
            eventOff={'onClick'}
            content={'Settings'}
            arrow={false}
            direction={'up'}
          >
            <ExpensesSettings types={types ? types.types : []} />
          </Tooltip>
        </Styled.PageHeader__Settings>
      </Styled.PageHeader>

      <Styled.PageContent>
        {error ? (
          <PageError>Couldn't get data, check your connection.</PageError>
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
                  .filter(expense => parseDateInverse(expense.date) === day)
                  .map(expense => (
                    <SingleExpense
                      key={expense.id}
                      id={expense.id}
                      title={expense.title}
                      date={expense.date}
                      value={expense.value}
                      type={expense.type}
                      currency={currency}
                    />
                  ))}
              </Styled.PageContent__Day__Expenses>
            </Styled.PageContent__Day>
          ))
        ) : (
          <Styled.PageContent__NoData>
            <NoDataIcon />
          </Styled.PageContent__NoData>
        )}
      </Styled.PageContent>
      <Styled.PageAddItem
        onClick={() => setActiveContent(ModuleTypes.Expenses)}
      >
        <PlusIcon />
      </Styled.PageAddItem>
    </Styled.PageContainer>
  )
}

export default ExpensesPage
