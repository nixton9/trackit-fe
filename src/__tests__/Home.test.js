import React from 'react'
import { render } from '@testing-library/react'
import Home from '../components/Home'
import { BrowserRouter } from 'react-router-dom'

describe('Home', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )

    expect(container).toMatchSnapshot()
  })

  it('shows the logo and intro text', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )

    expect(getByText('Trackit')).toBeInTheDocument()
  })

  it('shows the four widgets', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )

    expect(getByText('Notes')).toBeInTheDocument()
    expect(getByText('Tasks')).toBeInTheDocument()
    expect(getByText('Habits')).toBeInTheDocument()
    expect(getByText('Expenses')).toBeInTheDocument()
  })
})
