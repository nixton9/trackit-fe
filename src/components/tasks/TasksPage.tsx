import React from 'react'
import TasksSettings from './TasksSettings'
import SingleTask from './SingleTask'
import { tasks, tasksCategories } from '../../assets/fakeData'
import { Styled } from '../../styles/Page.styles'
import { Task } from '../../utils/ModuleTypes'
import { ReactComponent as ChevronIcon } from '../../assets/icons/chevron.svg'

const TasksPage: React.FC = () => {
  return (
    <Styled.PageContainer>
      <Styled.PageTitle>Tasks</Styled.PageTitle>

      <Styled.PageHeader>
        <Styled.PageHeader__View>
          <Styled.PageHeader__View__Dropdown>
            Today
            <ChevronIcon />
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
        {(tasks as Task[]).map(task => (
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
