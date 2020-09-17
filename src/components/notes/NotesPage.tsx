import React, { useState } from 'react'
import NotesSettings from './NotesSettings'
import SingleNote from './SingleNote'
import { SelectMenu } from '../misc/SelectMenu'
import { notes, notesTags } from '../../assets/fakeData'
import { Styled } from '../../styles/Page.styles'
import { Note, NoteTag } from '../../utils/ModuleTypes'
import { useQuery } from '@apollo/client'
import { NOTES, TAGS } from '../../utils/queries'

const NotesPage: React.FC = () => {
  const { loading, error, data } = useQuery(NOTES)
  const { data: tags } = useQuery(TAGS)
  const [view, setView] = useState('all')

  const viewOptions = tags
    ? [
        { val: 'all', label: 'All' },
        ...tags.tags.map((tag: NoteTag) => ({
          val: tag.id,
          label: tag.name
        }))
      ]
    : [{ val: 'all', label: 'All' }]

  const handleViewChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setView(e.target.value)

  const visibleNotes = data
    ? view === 'all'
      ? data.notes
      : data.notes.filter(
          (note: Note) => note.tags?.filter(tag => tag.id === view).length
        )
    : []
  console.log(view)
  data && console.log(data.notes)
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
            {data ? data.notes.length : ''}
          </Styled.PageHeader__View__Counter>
        </Styled.PageHeader__View>
        <Styled.PageHeader__Settings>
          {tags && <NotesSettings tags={tags.tags} />}
        </Styled.PageHeader__Settings>
      </Styled.PageHeader>

      <Styled.PageContent>
        {error ? (
          <div>Error component</div>
        ) : loading ? (
          <div>Loading component</div>
        ) : visibleNotes.length ? (
          (visibleNotes as Note[]).map(note => (
            <SingleNote
              key={note.id}
              id={note.id}
              title={note.title}
              date={note.date}
              tags={note.tags}
            />
          ))
        ) : (
          <Styled.PageContent__NoData>
            <p>No notes with this criteria.</p>
          </Styled.PageContent__NoData>
        )}
      </Styled.PageContent>
    </Styled.PageContainer>
  )
}

export default NotesPage
