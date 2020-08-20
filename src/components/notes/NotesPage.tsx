import React, { useState } from 'react'
import NotesSettings from './NotesSettings'
import SingleNote from './SingleNote'
import { SelectMenu } from '../misc/SelectMenu'
import { notes, notesTags } from '../../assets/fakeData'
import { Styled } from '../../styles/Page.styles'
import { Note } from '../../utils/ModuleTypes'

const NotesPage: React.FC = () => {
  const [view, setView] = useState('all')

  const viewOptions = [
    { val: 'all', label: 'All' },
    ...notesTags.map(tag => ({
      val: tag.id,
      label: tag.name
    }))
  ]

  const handleViewChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setView(e.target.value)

  const visibleNotes =
    view === 'all'
      ? notes
      : notes.filter(
          note => note.tags?.filter(tag => tag.id === parseInt(view, 10)).length
        )

  return (
    <Styled.PageContainer>
      <Styled.PageTitle>Notes</Styled.PageTitle>

      <Styled.PageHeader>
        <Styled.PageHeader__View>
          <Styled.PageHeader__View__Dropdown>
            <SelectMenu
              id="notes-view"
              value={view}
              onChange={handleViewChange}
              options={viewOptions}
              itemClass={'view-select-item'}
            />
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
        {(visibleNotes as Note[]).map(note => (
          <SingleNote
            key={note.id}
            id={note.id}
            title={note.title}
            date={note.date}
            tags={note.tags}
          />
        ))}
      </Styled.PageContent>
    </Styled.PageContainer>
  )
}

export default NotesPage
