import React from 'react'
import { render } from '@testing-library/react'
import TasksPage from '../components/tasks/TasksPage'
import SingleTask from '../components/tasks/SingleTask'
import TasksSettings from '../components/tasks/TasksSettings'
import { tasks, tasksCategories } from '../assets/fakeData'
import { BrowserRouter } from 'react-router-dom'

describe('Tasks Page', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <BrowserRouter>
        <TasksPage />
      </BrowserRouter>
    )

    expect(container).toMatchSnapshot()
  })

  it('has the title', () => {
    const { getByText } = render(
      <BrowserRouter>
        <TasksPage />
      </BrowserRouter>
    )

    expect(getByText('Tasks')).toBeInTheDocument()
  })
})

describe('SingleTask', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <BrowserRouter>
        <SingleTask
          id={tasks[0].id}
          title={tasks[0].title}
          date={tasks[0].date}
          done={tasks[0].done}
          category={tasks[0].category}
        />
      </BrowserRouter>
    )

    expect(container).toMatchSnapshot()
  })

  it('has all the content of the task', () => {
    const { getByText } = render(
      <BrowserRouter>
        <SingleTask
          id={tasks[0].id}
          title={tasks[0].title}
          date={tasks[0].date}
          done={tasks[0].done}
          category={tasks[0].category}
        />
      </BrowserRouter>
    )

    expect(getByText('Ir às compras')).toBeInTheDocument()
    expect(getByText('14 Aug')).toBeInTheDocument()
    expect(getByText('Waiting for')).toBeInTheDocument()
  })
})

describe('TasksSettings', () => {
  it('matches snashot', () => {
    const { container } = render(<TasksSettings tags={tasksCategories} />)

    expect(container).toMatchSnapshot()
  })

  it('has all the fields', () => {
    const { getByText } = render(<TasksSettings tags={tasksCategories} />)

    expect(getByText('Sort by')).toBeInTheDocument()
    expect(getByText('Font size')).toBeInTheDocument()
    expect(getByText('Categories')).toBeInTheDocument()
  })

  it('shows tags', () => {
    const { getByText } = render(<TasksSettings categories={tasksCategories} />)

    expect(getByText('Waiting for')).toBeInTheDocument()
    expect(getByText('House')).toBeInTheDocument()
    expect(getByText('Trackit')).toBeInTheDocument()
    expect(getByText('Stuff')).toBeInTheDocument()
  })
})
