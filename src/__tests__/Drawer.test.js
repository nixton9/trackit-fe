import React from 'react'
import { render } from '@testing-library/react'
import Drawer from '../components/misc/Drawer'

describe('Drawer', () => {
  it('matches snapshot', () => {
    const open = false
    const overlayEl = null
    const { container } = render(
      <Drawer title="Settings" open={open} overlayRef={overlayEl}>
        <div>
          <h3>First setting</h3>
          <p>Dropdown</p>
        </div>
      </Drawer>
    )

    expect(container).toMatchSnapshot()
  })

  it('shows the title', () => {
    const open = false
    const overlayEl = null
    const { getByText } = render(
      <Drawer title="Settings" open={open} overlayRef={overlayEl}>
        <div>
          <h3>First setting</h3>
          <p>Dropdown</p>
        </div>
      </Drawer>
    )

    expect(getByText('Settings')).toBeInTheDocument()
  })

  it('shows the content of the drawer', () => {
    const open = false
    const overlayEl = null
    const { getByText } = render(
      <Drawer title="Settings" open={open} overlayRef={overlayEl}>
        <div>
          <h3>First setting</h3>
          <p>Dropdown</p>
        </div>
      </Drawer>
    )

    expect(getByText('First setting')).toBeInTheDocument()
    expect(getByText('Dropdown')).toBeInTheDocument()
  })
})
