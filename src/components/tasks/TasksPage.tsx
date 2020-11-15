import React, { useState } from 'react'
import TasksSettings from './TasksSettings'
import SingleTask from './SingleTask'
import Tooltip from 'react-tooltip-lite'
import { SelectMenu } from '../misc/SelectMenu'
import { PageLoading } from '../misc/PageLoading'
import { PageError } from '../misc/PageError'
import { activeContentState } from '../misc/Add'
import { Styled } from '../../styles/Page.styles'
import { Task, TaskCategory, ModuleTypes } from '../../utils/ModuleTypes'
import { SortBySettings } from '../../utils/SettingsTypes'
import { TASKS, CATEGORIES } from '../../utils/queries'
import { isDateToday, parseDateInverse } from '../../utils/dateHelpers'
import { sortData } from '../../utils/globalHelpers'
import { ReactComponent as PlusIcon } from '../../assets/icons/plus.svg'
import { ReactComponent as NoDataIcon } from '../../assets/icons/nodata.svg'
import { ReactComponent as TasksIcon } from '../../assets/icons/tasks.svg'
import { ReactComponent as DoneTasksIcon } from '../../assets/icons/donetasks.svg'
import { useQuery } from '@apollo/client'
import { useSetRecoilState } from 'recoil'
import { Link } from 'react-router-dom'

type TasksPageProps = {
  done?: boolean
}

const TasksPage: React.FC<TasksPageProps> = ({ done }) => {
  const setActiveContent = useSetRecoilState(activeContentState)

  const { loading, error, data } = useQuery(TASKS, {
    variables: { done: done }
  })
  const { data: categories } = useQuery(CATEGORIES)

  const [view, setView] = useState('all')
  const [sortBy, setSortBy] = useState<SortBySettings>(SortBySettings.DATE)

  const defaultOptions = [
    { val: 'all', label: 'All' },
    { val: 'today', label: 'Today' }
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
          task.date ? isDateToday(parseDateInverse(task.date)) : false
        )
      : data.tasks.filter(
          (task: Task) => Number(task.category?.id) === Number(view)
        )
    : []

  const sortedTasks = sortData(visibleTasks, sortBy, true)

  return (
    <Styled.PageContainer>
      <Styled.PageTitle>{done && 'Completed'} Tasks</Styled.PageTitle>

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

          <Tooltip
            content={`${visibleTasks.length} tasks in view`}
            arrow={false}
            direction={'up'}
          >
            <Styled.PageHeader__View__Counter>
              {visibleTasks.length}
            </Styled.PageHeader__View__Counter>
          </Tooltip>
        </Styled.PageHeader__View>

        <Styled.PageHeader__Settings>
          {done ? (
            <Tooltip content={'Tasks'} arrow={false} direction={'up'}>
              <Link to="/tasks">
                <TasksIcon />
              </Link>
            </Tooltip>
          ) : (
            <Tooltip content={'Done Tasks'} arrow={false} direction={'up'}>
              <Link to="/tasks/done">
                <DoneTasksIcon />
              </Link>
            </Tooltip>
          )}

          <Tooltip content={'Settings'} arrow={false} direction={'up'}>
            <TasksSettings
              categories={categories ? categories.categories : []}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          </Tooltip>
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
            <NoDataIcon />
          </Styled.PageContent__NoData>
        )}
      </Styled.PageContent>
      <Styled.PageAddItem onClick={() => setActiveContent(ModuleTypes.Tasks)}>
        <PlusIcon />
      </Styled.PageAddItem>
    </Styled.PageContainer>
  )
}

export default TasksPage
