import React, { useState } from 'react'
import NotesSettings from './NotesSettings'
import SingleNote from './SingleNote'
import { SelectMenu } from '../misc/SelectMenu'
import { PageLoading } from '../misc/PageLoading'
import { PageError } from '../misc/PageError'
import { Styled } from '../../styles/Page.styles'
import { Note, NoteTag } from '../../utils/ModuleTypes'
import { NOTES, TAGS } from '../../utils/queries'
import { SortBySettings } from '../../utils/SettingsTypes'
import { sortData } from '../../utils/globalHelpers'
import { useQuery } from '@apollo/client'

const NotesPage: React.FC = () => {
  const { loading, error, data } = useQuery(NOTES)
  const { data: tags } = useQuery(TAGS)

  const [view, setView] = useState('all')
  const [sortBy, setSortBy] = useState<SortBySettings>(SortBySettings.DATE)

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
          (note: Note) =>
            note.tags?.filter(tag => Number(tag.id) === Number(view)).length
        )
    : []

  const sortedNotes = sortData(visibleNotes, sortBy)

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
          <NotesSettings
            tags={tags ? tags.tags : []}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </Styled.PageHeader__Settings>
      </Styled.PageHeader>

      <Styled.PageContent>
        {error ? (
          <PageError>{error.message}</PageError>
        ) : loading ? (
          <PageLoading />
        ) : sortedNotes.length ? (
          (sortedNotes as Note[]).map(note => (
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
