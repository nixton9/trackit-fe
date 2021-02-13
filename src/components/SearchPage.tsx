import React from 'react'
import { TaskStatus } from './tasks/TaskStatus'
import { PageLoading } from './misc/PageLoading'
import { PageError } from './misc/PageError'
import { Styled } from '../styles/Page.styles'
import { activeContentState, isEditState } from './misc/Add'
import { SEARCH } from '../utils/queries'
import { habitIdState } from '../utils/atoms'
import { ModuleTypes } from '../utils/ModuleTypes'
import { taskIdState, expenseIdState } from '../utils/atoms'
import { showCurrencySym } from '../utils/globalHelpers'
import { getCurrentStreak } from '../utils/statsHelpers'
import { useLocalStorage } from '../utils/useLocalStorage'
import { displayDateString, parseDateInverse } from '../utils/dateHelpers'
import ScrollLock, { TouchScrollable } from 'react-scrolllock'
import { RouteComponentProps } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'

type MatchParams = {
  query: string
}

const SearchPage: React.FC<RouteComponentProps<MatchParams>> = ({ match }) => {
  const setActiveContent = useSetRecoilState(activeContentState)
  const setIsEdit = useSetRecoilState(isEditState)
  const setTaskId = useSetRecoilState(taskIdState)
  const setExpenseId = useSetRecoilState(expenseIdState)
  const setHabitId = useSetRecoilState(habitIdState)

  const [currency] = useLocalStorage('currency', '')

  const { loading, error, data } = useQuery(SEARCH, {
    variables: { query: match.params.query }
  })

  const history = useHistory()

  let results: any = null
  let hasResults = false

  const handleItemClick = (id: string, module: string) => {
    switch (module) {
      case ModuleTypes.Tasks:
        editItem(id, module, setTaskId)
        break

      case ModuleTypes.Expenses:
        editItem(id, module, setExpenseId)
        break

      case ModuleTypes.Habits:
        editItem(id, module, setHabitId)
        break

      default:
        history.push(`/notes/${id}`)
    }
  }

  const editItem = (
    id: string,
    module: string,
    setId: (id: string) => void
  ) => {
    setActiveContent(module)
    setIsEdit(true)
    setId(id)
  }

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

  return (
    <>
      <ScrollLock />

      <Styled.PageContainer className="search-page page-container">
        <Styled.PageTitle className="search-title smaller">
          Search results for "{match.params.query}"
        </Styled.PageTitle>

        {error ? (
          <PageError>{error.message}</PageError>
        ) : loading ? (
          <PageLoading />
        ) : hasResults ? (
          <TouchScrollable>
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
                          <Styled.SearchResults__Item
                            key={item.id}
                            onClick={() => handleItemClick(item.id, module)}
                          >
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
                                {item.value}
                                {currency && showCurrencySym(currency)}
                              </Styled.SearchResults__Item__Value>
                            )}
                            {item.hasOwnProperty('done') && (
                              <TaskStatus isDone={item.done} />
                            )}
                            {item.hasOwnProperty('days') && (
                              <Styled.SearchResults__Item__Value>
                                {getCurrentStreak(item.days)} days
                              </Styled.SearchResults__Item__Value>
                            )}
                          </Styled.SearchResults__Item>
                        ))}
                      </Styled.SearchResults__Module>
                    )
                )}
            </Styled.SearchResults>
          </TouchScrollable>
        ) : (
          <Styled.PageContent__NoData>
            <p>No notes with this criteria.</p>
          </Styled.PageContent__NoData>
        )}
      </Styled.PageContainer>
    </>
  )
}

export default SearchPage
