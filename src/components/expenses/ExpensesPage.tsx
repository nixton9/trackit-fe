import React, { useState } from 'react'
import ExpensesSettings from './ExpensesSettings'
import SingleExpense from './SingleExpense'
import DatePickerInput from '../misc/DatePickerInput'
import { expenses, expensesCategories } from '../../assets/fakeData'
import { Styled } from '../../styles/Page.styles'
import { Expense } from '../../utils/ModuleTypes'
import { displayDateString, parseDate } from '../../utils/dateHelpers'
import { startOfMonth, endOfMonth, isWithinInterval } from 'date-fns'
import { ReactComponent as ChevronIcon } from '../../assets/icons/chevron.svg'
const ExpensesPage: React.FC = () => {
  const [startDate, setStartDate] = useState(startOfMonth(new Date()))
  const [endDate, setEndDate] = useState(endOfMonth(new Date()))

  const expensesDays = Array.from(
    new Set(expenses.map(expense => expense.date))
  )

  const visibleExpensesDay = expensesDays.filter(day =>
    isWithinInterval(parseDate(day), {
      start: startDate,
      end: endDate
    })
  )

  const totalExpensesVal = expenses
    .filter(expense => visibleExpensesDay.includes(expense.date))
    .reduce((acc, obj) => acc + obj.value, 0)

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
            <ChevronIcon />
          </Styled.PageHeader__View__Dropdown>
          <Styled.PageHeader__View__Counter>
            {totalExpensesVal}$
          </Styled.PageHeader__View__Counter>
        </Styled.PageHeader__View>
        <Styled.PageHeader__Settings>
          <ExpensesSettings categories={expensesCategories} />
        </Styled.PageHeader__Settings>
      </Styled.PageHeader>

      <Styled.PageContent>
        {visibleExpensesDay.length ? (
          (visibleExpensesDay as string[]).map(day => (
            <Styled.PageContent__Day key={day}>
              <Styled.PageContent__Day__Title>
                {displayDateString(day)}
              </Styled.PageContent__Day__Title>
              <Styled.PageContent__Day__Expenses>
                {(expenses as Expense[])
                  .filter(expense => expense.date === day)
                  .map(expense => (
                    <SingleExpense
                      key={expense.id}
                      id={expense.id}
                      title={expense.title}
                      date={expense.date}
                      value={expense.value}
                      category={expense.category}
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
