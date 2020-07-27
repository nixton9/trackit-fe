import React from 'react'
import { render } from '@testing-library/react'
import HomeWidget from '../components/misc/HomeWidget'
import { ModuleTypes } from '../utils/ModuleTypes'
import { ReactComponent as NotesIcon } from '../assets/icons/notes.svg'
import { BrowserRouter } from 'react-router-dom'

describe('HomeWidget', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <BrowserRouter>
        <HomeWidget
          type={ModuleTypes.Notes}
          value="32"
          label="created"
          url="/link"
          icon={<NotesIcon />}
        />
      </BrowserRouter>
    )

    expect(container).toMatchSnapshot()
  })

  it('has all content', () => {
    const { getByText } = render(
      <BrowserRouter>
        <HomeWidget
          type={ModuleTypes.Notes}
          value="32"
          label="created"
          url="/link"
          icon={<NotesIcon />}
        />
      </BrowserRouter>
    )

    expect(getByText('Notes')).toBeInTheDocument()
    expect(getByText('32')).toBeInTheDocument()
    expect(getByText('created')).toBeInTheDocument()
  })
})
