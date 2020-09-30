import React from 'react'
import { render } from '@testing-library/react'
import Home from '../components/Home'
import { BrowserRouter } from 'react-router-dom'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: '/',
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6MTU5NDU3Nzc1M30.BLYTV2jBpTk3PyMU7j9-53FAXEzAY6KuBH79mIbZvho`
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
})
