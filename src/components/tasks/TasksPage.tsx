import React, { useState } from 'react'
import TasksSettings from './TasksSettings'
import SingleTask from './SingleTask'
import { SelectMenu } from '../misc/SelectMenu'
import { PageLoading } from '../misc/PageLoading'
import { PageError } from '../misc/PageError'
import { Styled } from '../../styles/Page.styles'
import { Task, TaskCategory } from '../../utils/ModuleTypes'
import { SortBySettings } from '../../utils/SettingsTypes'
import { TASKS, CATEGORIES } from '../../utils/queries'
import { isDateToday } from '../../utils/dateHelpers'
import { sortData } from '../../utils/globalHelpers'
import { useQuery } from '@apollo/client'

const TasksPage: React.FC = () => {
  const { loading, error, data } = useQuery(TASKS)
  const { data: categories } = useQuery(CATEGORIES)

  const [view, setView] = useState('today')
  const [sortBy, setSortBy] = useState<SortBySettings>(SortBySettings.DATE)

  const defaultOptions = [
    { val: 'today', label: 'Today' },
    { val: 'all', label: 'All' }
  ]

  const viewOptions = categories
    ? [
        ...defaultOptions,
        ...categories.categories.map((cat: TaskCategory) => ({
          val: cat.id,
          label: cat.name
        }))
      ]
    : defaultOptions

  const handleViewChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setView(e.target.value)

  const visibleTasks = data
    ? view === 'all'
      ? data.tasks
      : view === 'today'
      ? data.tasks.filter((task: Task) =>
          isDateToday(task.date.substring(0, 10))
        )
      : data.tasks.filter(
          (task: Task) => Number(task.category?.id) === Number(view)
        )
    : []

  const sortedTasks = sortData(visibleTasks, sortBy, true)

  return (
    <Styled.PageContainer>
      <Styled.PageTitle>Tasks</Styled.PageTitle>

      <Styled.PageHeader>
        <Styled.PageHeader__View>
          <Styled.PageHeader__View__Dropdown>
            <SelectMenu
              id="tasks-view"
              value={view}
              onChange={handleViewChange}
              options={viewOptions}
              itemClass={'view-select-item'}
            />
          </Styled.PageHeader__View__Dropdown>
          <Styled.PageHeader__View__Counter>
            {visibleTasks.length}
          </Styled.PageHeader__View__Counter>
        </Styled.PageHeader__View>
        <Styled.PageHeader__Settings>
          <TasksSettings
            categories={categories ? categories.categories : []}
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
        ) : sortedTasks.length ? (
          (sortedTasks as Task[]).map(task => (
            <SingleTask
              key={task.id}
              id={task.id}
              title={task.title}
              date={task.date}
              done={task.done}
              category={task.category}
            />
          ))
        ) : (
          <Styled.PageContent__NoData>
            <p>No tasks to do in here.</p>
          </Styled.PageContent__NoData>
        )}
      </Styled.PageContent>
    </Styled.PageContainer>
  )
}

export default TasksPage
