import React from 'react'
import { render } from '@testing-library/react'
import NotesPage from '../components/notes/NotesPage'
import SingleNote from '../components/notes/SingleNote'
import { notes } from '../assets/fakeData'
import { BrowserRouter } from 'react-router-dom'

describe('NotesPage', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <BrowserRouter>
        <NotesPage />
      </BrowserRouter>
    )

    expect(container).toMatchSnapshot()
  })

  it('has the title', () => {
    const { getByText } = render(
      <BrowserRouter>
        <NotesPage />
      </BrowserRouter>
    )

    expect(getByText('Notes')).toBeInTheDocument()
  })
})

describe('SingleNote', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <SingleNote
        id={notes[0].id}
        title={notes[0].title}
        date={notes[0].date}
        tags={notes[0].tags}
      />
    )

    expect(container).toMatchSnapshot()
  })

  it('has all the content of the note', () => {
    const { getByText } = render(
      <SingleNote
        id={notes[0].id}
        title={notes[0].title}
        date={notes[0].date}
        tags={notes[0].tags}
      />
    )

    expect(getByText('Lista de compras')).toBeInTheDocument()
    expect(getByText('20 July')).toBeInTheDocument()
    expect(getByText('Primary')).toBeInTheDocument()
    expect(getByText('Secondary')).toBeInTheDocument()
  })
})
