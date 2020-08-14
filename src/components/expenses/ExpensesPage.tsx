import React from 'react'
import ExpensesSettings from './ExpensesSettings'
import SingleExpense from './SingleExpense'
import { expenses, expensesCategories } from '../../assets/fakeData'
import { Styled } from '../../styles/Page.styles'
import { Expense } from '../../utils/ModuleTypes'
import { displayDateString } from '../../utils/dateHelpers'
import { ReactComponent as ChevronIcon } from '../../assets/icons/chevron.svg'
import { format, startOfMonth, endOfMonth } from 'date-fns'

const ExpensesPage: React.FC = () => {
  const monthStart = format(startOfMonth(new Date()), 'dd MMM')
  const monthEnd = format(endOfMonth(new Date()), 'dd MMM')
  const totalExpensesVal = expenses.reduce((acc, obj) => acc + obj.value, 0)
  const expensesDays = Array.from(
    new Set(expenses.map(expense => expense.date))
  )

  return (
    <Styled.PageContainer>
      <Styled.PageTitle>Expenses</Styled.PageTitle>
      <Styled.PageHeader>
        <Styled.PageHeader__View>
          <Styled.PageHeader__View__Dropdown>
            {monthStart} - {monthEnd}
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
        {(expensesDays as string[]).map(day => (
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
        ))}
      </Styled.PageContent>
    </Styled.PageContainer>
  )
}

export default ExpensesPage
