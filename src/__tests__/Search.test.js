import React from 'react'
import { render } from '@testing-library/react'
import Search from '../components/misc/Search'

describe('Search', () => {
  it('matches snapshot', () => {
    const { container } = render(<Search />)

    expect(container).toMatchSnapshot()
  })

  it('has the input', () => {
    const { getByPlaceholderText } = render(<Search />)

    expect(
      getByPlaceholderText('Search for a note, task, habit or expense')
    ).toBeInTheDocument()
  })
})
