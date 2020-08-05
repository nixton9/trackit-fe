import React from 'react'
import { render } from '@testing-library/react'
import ExpensesPage from '../components/expenses/ExpensesPage'
import ExpensesSettings from '../components/expenses/ExpensesSettings'
import SingleExpense from '../components/expenses/SingleExpense'
import { expenses, expensesCategories } from '../assets/fakeData'
import { BrowserRouter } from 'react-router-dom'

describe('Expenses Page', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <BrowserRouter>
        <ExpensesPage />
      </BrowserRouter>
    )

    expect(container).toMatchSnapshot()
  })

  it('has the title', () => {
    const { getByText } = render(
      <BrowserRouter>
        <ExpensesPage />
      </BrowserRouter>
    )

    expect(getByText('Expenses')).toBeInTheDocument()
  })
})

describe('SingleExpense', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <BrowserRouter>
        <SingleExpense
          id={expenses[0].id}
          title={expenses[0].title}
          date={expenses[0].date}
          value={expenses[0].value}
          category={expenses[0].category}
        />
      </BrowserRouter>
    )

    expect(container).toMatchSnapshot()
  })

  it('has all the content of the task', () => {
    const { getByText } = render(
      <BrowserRouter>
        <SingleExpense
          id={expenses[0].id}
          title={expenses[0].title}
          date={expenses[0].date}
          value={expenses[0].value}
          category={expenses[0].category}
        />
      </BrowserRouter>
    )

    expect(getByText('Conta Hospital')).toBeInTheDocument()
    expect(getByText('57.75$')).toBeInTheDocument()
    expect(getByText('Saúde')).toBeInTheDocument()
  })
})

describe('ExpensesSettings', () => {
  it('matches snashot', () => {
    const { container } = render(
      <ExpensesSettings categories={expensesCategories} />
    )

    expect(container).toMatchSnapshot()
  })

  it('has all the fields', () => {
    const { getByText } = render(
      <ExpensesSettings categories={expensesCategories} />
    )

    expect(getByText('Currency')).toBeInTheDocument()
    expect(getByText('Font size')).toBeInTheDocument()
    expect(getByText('Categories')).toBeInTheDocument()
  })

  it('shows tags', () => {
    const { getByText } = render(
      <ExpensesSettings categories={expensesCategories} />
    )

    expect(getByText('Transportes')).toBeInTheDocument()
    expect(getByText('Saúde')).toBeInTheDocument()
    expect(getByText('Casa')).toBeInTheDocument()
    expect(getByText('Vestuário')).toBeInTheDocument()
    expect(getByText('Educação')).toBeInTheDocument()
    expect(getByText('Lazer')).toBeInTheDocument()
  })
})
