import React, { useState } from 'react'
import TasksSettings from './TasksSettings'
import SingleTask from './SingleTask'
import { SelectMenu } from '../misc/SelectMenu'
import { tasks, tasksCategories } from '../../assets/fakeData'
import { Styled } from '../../styles/Page.styles'
import { Task } from '../../utils/ModuleTypes'

const TasksPage: React.FC = () => {
  const [view, setView] = useState('today')

  const viewOptions = [
    { val: 'today', label: 'Today' },
    ...tasksCategories.map(cat => ({
      val: cat.id,
      label: cat.name
    }))
  ]

  const handleViewChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setView(e.target.value)

  const visibleTasks =
    view === 'today'
      ? tasks
      : tasks.filter(task => task.category?.id === parseInt(view, 10))

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
            {tasks.length}
          </Styled.PageHeader__View__Counter>
        </Styled.PageHeader__View>
        <Styled.PageHeader__Settings>
          <TasksSettings categories={tasksCategories} />
        </Styled.PageHeader__Settings>
      </Styled.PageHeader>

      <Styled.PageContent>
        {(visibleTasks as Task[]).map(task => (
          <SingleTask
            key={task.id}
            id={task.id}
            title={task.title}
            date={task.date}
            done={task.done}
            category={task.category}
          />
        ))}
      </Styled.PageContent>
    </Styled.PageContainer>
  )
}

export default TasksPage
