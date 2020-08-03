import React from 'react'
import NotesSettings from './NotesSettings'
import SingleNote from './SingleNote'
import { notes, notesTags } from '../../assets/fakeData'
import { Styled } from '../../styles/Page.styles'
import { Note } from '../../utils/ModuleTypes'
import { ReactComponent as ChevronIcon } from '../../assets/icons/chevron.svg'
import { NavLink } from 'react-router-dom'

const NotesPage: React.FC = () => {
  return (
    <Styled.PageContainer>
      <Styled.PageTitle>Notes</Styled.PageTitle>

      <Styled.PageHeader>
        <Styled.PageHeader__View>
          <Styled.PageHeader__View__Dropdown>
            All
            <ChevronIcon />
          </Styled.PageHeader__View__Dropdown>
          <Styled.PageHeader__View__Counter>
            {notes.length}
          </Styled.PageHeader__View__Counter>
        </Styled.PageHeader__View>
        <Styled.PageHeader__Settings>
          <NotesSettings tags={notesTags} />
        </Styled.PageHeader__Settings>
      </Styled.PageHeader>

      <Styled.PageContent>
        {(notes as Note[]).map(note => (
          <NavLink to={`/notes/${note.id}`} key={note.id}>
            <SingleNote
              id={note.id}
              title={note.title}
              date={note.date}
              tags={note.tags}
            />
          </NavLink>
        ))}
      </Styled.PageContent>
    </Styled.PageContainer>
  )
}

export default NotesPage
