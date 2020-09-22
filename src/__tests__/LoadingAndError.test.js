import React from 'react'
import { render } from '@testing-library/react'
import { PageLoading } from '../components/misc/PageLoading'
import { PageError } from '../components/misc/PageError'

describe('Loading', () => {
  it('matches snapshot', () => {
    const { container } = render(<PageLoading />)

    expect(container).toMatchSnapshot()
  })
})

describe('Error', () => {
  it('matches snapshot', () => {
    const { container } = render(<PageError>Test</PageError>)

    expect(container).toMatchSnapshot()
  })

  it('shows the error message', () => {
    const { getByText } = render(<PageError>Error fetching data</PageError>)

    expect(getByText('Error fetching data')).toBeInTheDocument()
  })
})
