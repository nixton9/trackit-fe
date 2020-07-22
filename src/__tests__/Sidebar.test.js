import React from 'react'
import { render } from '@testing-library/react'
import Sidebar from '../components/misc/Sidebar'
import { BrowserRouter } from 'react-router-dom'

const user = {
  image: 'https://randomuser.me/api/portraits/men/51.jpg',
  name: 'John Doe',
  email: 'johndoe@gmail.com'
}

describe('Sidebar', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <BrowserRouter>
        <Sidebar user={user} />
      </BrowserRouter>
    )

    expect(container).toMatchSnapshot()
  })

  it('shows a user', () => {
    const { getByText, getByAltText } = render(
      <BrowserRouter>
        <Sidebar user={user} />
      </BrowserRouter>
    )

    expect(getByAltText('John Doe')).toBeInTheDocument()
    expect(getByText('John Doe')).toBeInTheDocument()
    expect(getByText('johndoe@gmail.com')).toBeInTheDocument()
  })

  it('has all links', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Sidebar user={user} />
      </BrowserRouter>
    )

    expect(getByText('Home')).toBeInTheDocument()
    expect(getByText('Notes')).toBeInTheDocument()
    expect(getByText('Tasks')).toBeInTheDocument()
    expect(getByText('Habits')).toBeInTheDocument()
    expect(getByText('Expenses')).toBeInTheDocument()
    expect(getByText('Settings')).toBeInTheDocument()
  })
})
