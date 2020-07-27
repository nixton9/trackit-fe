import React from 'react'
import { render } from '@testing-library/react'
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'
import { BrowserRouter } from 'react-router-dom'

describe('SignIn', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    )

    expect(container).toMatchSnapshot()
  })

  it('has all the inputs', () => {
    const { getByPlaceholderText } = render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    )

    expect(getByPlaceholderText('Email address')).toBeInTheDocument()
    expect(getByPlaceholderText('Password')).toBeInTheDocument()
  })
})

describe('SignUp', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    )

    expect(container).toMatchSnapshot()
  })

  it('has all the inputs', () => {
    const { getByPlaceholderText } = render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    )

    expect(getByPlaceholderText('Name')).toBeInTheDocument()
    expect(getByPlaceholderText('Email address')).toBeInTheDocument()
    expect(getByPlaceholderText('Password')).toBeInTheDocument()
  })
})
