import React from 'react'
import { PageLoading } from './misc/PageLoading'
import { PageError } from './misc/PageError'
import { Styled } from '../styles/Page.styles'
import { SEARCH } from '../utils/queries'
import { Note, Task, Expense, Habit } from '../utils/ModuleTypes'
import { displayDateString, parseDateInverse } from '../utils/dateHelpers'
import { RouteComponentProps } from 'react-router-dom'
import { useQuery } from '@apollo/client'

type SearchPageProps = {
  query: string
}

type SearchResults = {
  Notes: Note[] | []
  Tasks: Task[] | []
  Expenses: Expense[] | []
  Habits: Habit[] | []
}

const SearchPage: React.FC<RouteComponentProps<SearchPageProps>> = ({
  match
}) => {
  const { loading, error, data } = useQuery(SEARCH, {
    variables: { query: match.params.query }
  })

  let results: any = null
  let hasResults = false

  if (data) {
    results = {
      Notes: data.search.notes,
      Tasks: data.search.tasks,
      Expenses: data.search.expenses,
      Habits: data.search.habits
    }

    if (
      Object.keys(data.search).some(
        (item: string) => item !== '__typename' && data.search[item].length
      )
    ) {
      hasResults = true
    }
  }
  console.log(results)
  return (
    <Styled.PageContainer>
      <Styled.PageTitle className="smaller">
        Search results for "{match.params.query}"
      </Styled.PageTitle>

      {error ? (
        <PageError>{error.message}</PageError>
      ) : loading ? (
        <PageLoading />
      ) : hasResults ? (
        <Styled.SearchResults>
          {results &&
            Object.keys(results).map(
              module =>
                results[module].length > 0 && (
                  <Styled.SearchResults__Module key={module}>
                    <Styled.SearchResults__Module__Title>
                      {module}
                    </Styled.SearchResults__Module__Title>
                    {results[module].map((item: any) => (
                      <Styled.SearchResults__Item key={item.id}>
                        <Styled.SearchResults__Item__Title>
                          {item.title}
                        </Styled.SearchResults__Item__Title>
                        {item.date && (
                          <Styled.SearchResults__Item__Date>
                            {displayDateString(parseDateInverse(item.date))}
                          </Styled.SearchResults__Item__Date>
                        )}
                        {item.value && (
                          <Styled.SearchResults__Item__Value>
                            {item.value}$
                          </Styled.SearchResults__Item__Value>
                        )}
                      </Styled.SearchResults__Item>
                    ))}
                  </Styled.SearchResults__Module>
                )
            )}
        </Styled.SearchResults>
      ) : (
        <Styled.PageContent__NoData>
          <p>No notes with this criteria.</p>
        </Styled.PageContent__NoData>
      )}
    </Styled.PageContainer>
  )
}

export default SearchPage
