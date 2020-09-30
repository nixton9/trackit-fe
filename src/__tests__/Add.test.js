import React from 'react'
import { render } from '@testing-library/react'
import Add from '../components/misc/Add'
import AddTask from '../components/tasks/AddTask'
import AddExpense from '../components/expenses/AddExpense'
import AddHabit from '../components/habits/AddHabit'
import { format } from 'date-fns'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: '/',
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6MTU5NDU3Nzc1M30.BLYTV2jBpTk3PyMU7j9-53FAXEzAY6KuBH79mIbZvho`
  }
})

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
    const { container } = render(
      <ApolloProvider client={client}>
        <AddTask />
      </ApolloProvider>
    )

    expect(container).toBeInTheDocument()
  })

  it('renders the inputs', () => {
    const { getByPlaceholderText, getByDisplayValue, getByText } = render(
      <ApolloProvider client={client}>
        <AddTask />
      </ApolloProvider>
    )

    expect(getByPlaceholderText('Ex: Take out the trash')).toBeInTheDocument()
    expect(getByDisplayValue(format(new Date(), 'd MMM'))).toBeInTheDocument()
    expect(getByText('Inbox')).toBeInTheDocument()
  })
})

describe('AddExpense', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <ApolloProvider client={client}>
        <AddExpense />
      </ApolloProvider>
    )

    expect(container).toBeInTheDocument()
  })

  it('renders the inputs', () => {
    const { getByPlaceholderText, getByDisplayValue, getByText } = render(
      <ApolloProvider client={client}>
        <AddExpense />
      </ApolloProvider>
    )

    expect(getByPlaceholderText('9.99')).toBeInTheDocument()
    expect(getByPlaceholderText('Ex: Dinner at mcdonalds')).toBeInTheDocument()
    expect(getByDisplayValue(format(new Date(), 'd MMM'))).toBeInTheDocument()
    expect(getByText('All')).toBeInTheDocument()
  })
})

describe('AddHabit', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <ApolloProvider client={client}>
        <AddHabit />
      </ApolloProvider>
    )

    expect(container).toBeInTheDocument()
  })

  it('renders the inputs', () => {
    const { getByPlaceholderText } = render(
      <ApolloProvider client={client}>
        <AddHabit />
      </ApolloProvider>
    )

    expect(getByPlaceholderText('Ex: Eat healthy')).toBeInTheDocument()
  })
})
