import React from 'react'
import { render } from '@testing-library/react'
import SignIn from '../components/auth/SignIn'
import SignUp from '../components/auth/SignUp'
import ForgotPassword from '../components/auth/ForgotPassword'
import ResetPassword from '../components/auth/ResetPassword'
import { BrowserRouter } from 'react-router-dom'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: '/',
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6MTU5NDYyMzYxN30.eRuuyy-6EE6UkGFQI9UQmRklwPiyXgSJgmoZektpiG4`
  }
})
describe('SignIn', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <ApolloProvider client={client}>
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      </ApolloProvider>
    )

    expect(container).toMatchSnapshot()
  })

  it('has all the inputs', () => {
    const { getByPlaceholderText } = render(
      <ApolloProvider client={client}>
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      </ApolloProvider>
    )

    expect(getByPlaceholderText('Email address')).toBeInTheDocument()
    expect(getByPlaceholderText('Password')).toBeInTheDocument()
  })
})

describe('SignUp', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <ApolloProvider client={client}>
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      </ApolloProvider>
    )

    expect(container).toMatchSnapshot()
  })

  it('has all the inputs', () => {
    const { getByPlaceholderText } = render(
      <ApolloProvider client={client}>
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      </ApolloProvider>
    )

    expect(getByPlaceholderText('Name')).toBeInTheDocument()
    expect(getByPlaceholderText('Email address')).toBeInTheDocument()
    expect(getByPlaceholderText('Password')).toBeInTheDocument()
  })
})

describe('ForgotPassword', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <ApolloProvider client={client}>
        <BrowserRouter>
          <ForgotPassword />
        </BrowserRouter>
      </ApolloProvider>
    )

    expect(container).toMatchSnapshot()
  })

  it('has the email input', () => {
    const { getByPlaceholderText } = render(
      <ApolloProvider client={client}>
        <BrowserRouter>
          <ForgotPassword />
        </BrowserRouter>
      </ApolloProvider>
    )

    expect(getByPlaceholderText('Email address')).toBeInTheDocument()
  })
})

describe('ResetPassword', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <ApolloProvider client={client}>
        <BrowserRouter>
          <ResetPassword />
        </BrowserRouter>
      </ApolloProvider>
    )

    expect(container).toMatchSnapshot()
  })

  it('has the password input', () => {
    const { getByPlaceholderText } = render(
      <ApolloProvider client={client}>
        <BrowserRouter>
          <ResetPassword />
        </BrowserRouter>
      </ApolloProvider>
    )

    expect(getByPlaceholderText('Password')).toBeInTheDocument()
  })
})
