import React from 'react'
import { render } from '@testing-library/react'
import Add from '../components/misc/Add'
import AddTask from '../components/tasks/AddTask'
import AddExpense from '../components/expenses/AddExpense'
import AddHabit from '../components/habits/AddHabit'
import { format } from 'date-fns'

describe('Add', () => {
  it('matches snapshot', () => {
    const { container } = render(<Add />)

    expect(container).toMatchSnapshot()
  })

  it('renders all the buttons and the title', () => {
    const { getByText } = render(<Add />)

    expect(getByText('What do you want to track?')).toBeTruthy()
    expect(getByText('Create a note')).toBeInTheDocument()
    expect(getByText('Create a task')).toBeInTheDocument()
    expect(getByText('Add an expense')).toBeInTheDocument()
    expect(getByText('Add an habit')).toBeInTheDocument()
  })
})

describe('AddTask', () => {
  it('matches snapshot', () => {
    const { container } = render(<AddTask />)

    expect(container).toBeInTheDocument()
  })

  it('renders the inputs', () => {
    const { getByPlaceholderText, getByDisplayValue, getByText } = render(
      <AddTask />
    )

    expect(getByPlaceholderText('Ex: Take out the trash')).toBeInTheDocument()
    expect(getByDisplayValue(format(new Date(), 'd MMM'))).toBeInTheDocument()
    expect(getByText('Inbox')).toBeInTheDocument()
  })
})

describe('AddExpense', () => {
  it('matches snapshot', () => {
    const { container } = render(<AddExpense />)

    expect(container).toBeInTheDocument()
  })

  it('renders the inputs', () => {
    const { getByPlaceholderText, getByDisplayValue, getByText } = render(
      <AddExpense />
    )

    expect(getByPlaceholderText('9.99')).toBeInTheDocument()
    expect(getByPlaceholderText('Ex: Dinner at mcdonalds')).toBeInTheDocument()
    expect(getByDisplayValue(format(new Date(), 'd MMM'))).toBeInTheDocument()
    expect(getByText('All')).toBeInTheDocument()
  })
})

describe('AddHabit', () => {
  it('matches snapshot', () => {
    const { container } = render(<AddHabit />)

    expect(container).toBeInTheDocument()
  })

  it('renders the inputs', () => {
    const { getByPlaceholderText } = render(<AddHabit />)

    expect(getByPlaceholderText('Ex: Eat healthy')).toBeInTheDocument()
  })
})
