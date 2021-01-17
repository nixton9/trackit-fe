import React, { Dispatch, SetStateAction } from 'react'
import ExpensesSettings from './ExpensesSettings'
import SingleExpense from './SingleExpense'
import DatePickerInput from '../misc/DatePickerInput'
import { PageLoading } from '../misc/PageLoading'
import { PageError } from '../misc/PageError'
import { Styled } from '../../styles/Page.styles'
import { showCurrencySym } from '../../utils/globalHelpers'
import {
  Expense,
  ExpenseType,
  ModuleTypes,
  Currencies
} from '../../utils/ModuleTypes'
import { displayDateString, parseDateInverse } from '../../utils/dateHelpers'
import { ReactComponent as ChevronIcon } from '../../assets/icons/chevron.svg'
import { ReactComponent as PlusIcon } from '../../assets/icons/plus.svg'
import { ReactComponent as NoDataIcon } from '../../assets/icons/nodata.svg'
import { ReactComponent as StatsIcon } from '../../assets/icons/stats.svg'
import Tooltip from 'react-tooltip-lite'
import { Link } from 'react-router-dom'
import { ApolloError } from '@apollo/client'

type ExpensesListProps = {
  startDate: Date
  setStartDate: Dispatch<SetStateAction<Date>>
  endDate: Date
  setEndDate: Dispatch<SetStateAction<Date>>
  totalExpensesVal: string
  visibleExpensesDay: string[]
  currency: Currencies
  data: { expenses: Expense[] }
  types: { types: ExpenseType[] }
  error: ApolloError | undefined
  loading: boolean
  setActiveContent: Dispatch<SetStateAction<string>>
}

export const ExpensesList: React.FC<ExpensesListProps> = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  totalExpensesVal,
  visibleExpensesDay,
  currency,
  data,
  types,
  error,
  loading,
  setActiveContent
}) => {
  return (
    <>
      <div className="page-header-wrapper">
        <Styled.PageTitle>Expenses</Styled.PageTitle>
        <Styled.PageHeader>
          <Styled.PageHeader__View>
            <Styled.PageHeader__View__Dropdown
              className="expenses"
              id="expenses-view"
            >
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
              tipContentClassName="visible-tooltip"
              content={'Spent on this period'}
              arrow={false}
              direction={'up'}
            >
              <Styled.PageHeader__View__Counter className="expenses-counter">
                {totalExpensesVal} {currency && showCurrencySym(currency)}
              </Styled.PageHeader__View__Counter>
            </Tooltip>
          </Styled.PageHeader__View>

          <Styled.PageHeader__Settings>
            <Tooltip
              eventOff={'onClick'}
              content={'Statistics'}
              arrow={false}
              direction={'up'}
              className="tooltip"
            >
              <Link
                to="/expenses/stats"
                className="mbl-click"
                data-test-id="expenses-stats-link"
              >
                <StatsIcon className="stats-icon" />
              </Link>
            </Tooltip>

            <Tooltip
              eventOff={'onClick'}
              content={'Settings'}
              arrow={false}
              direction={'up'}
              className="tooltip"
            >
              <div className="mbl-click tooltip">
                <ExpensesSettings types={types ? types.types : []} />
              </div>
            </Tooltip>
          </Styled.PageHeader__Settings>
        </Styled.PageHeader>
      </div>

      <Styled.PageContent>
        {error ? (
          <PageError>
            We're sorry but it seems there was a problem reaching the server.
          </PageError>
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
        data-test-id="add-expense"
      >
        <PlusIcon className="add-expense-icon" />
      </Styled.PageAddItem>
    </>
  )
}
