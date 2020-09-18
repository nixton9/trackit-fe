import React from 'react'
import { render } from '@testing-library/react'
import Home from '../components/Home'
import { BrowserRouter } from 'react-router-dom'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: '/',
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6MTU5NDYyMzYxN30.eRuuyy-6EE6UkGFQI9UQmRklwPiyXgSJgmoZektpiG4`
  }
})

describe('Home', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </ApolloProvider>
    )

    expect(container).toMatchSnapshot()
  })

  it('shows the logo and intro text', () => {
    const { getByText } = render(
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </ApolloProvider>
    )

    expect(getByText('Trackit')).toBeInTheDocument()
  })

  it('shows the four widgets', () => {
    const { getByText } = render(
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </ApolloProvider>
    )

    expect(getByText('Notes')).toBeInTheDocument()
    expect(getByText('Tasks')).toBeInTheDocument()
    expect(getByText('Habits')).toBeInTheDocument()
    expect(getByText('Expenses')).toBeInTheDocument()
  })
})
