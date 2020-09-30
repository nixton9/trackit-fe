import React from 'react'
import { render } from '@testing-library/react'
import TasksPage from '../components/tasks/TasksPage'
import SingleTask from '../components/tasks/SingleTask'
import TasksSettings from '../components/tasks/TasksSettings'
import { tasks, tasksCategories } from '../assets/fakeData'
import { BrowserRouter } from 'react-router-dom'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: '/',
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6MTU5NDU3Nzc1M30.BLYTV2jBpTk3PyMU7j9-53FAXEzAY6KuBH79mIbZvho`
  }
})

describe('Tasks Page', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <ApolloProvider client={client}>
        <BrowserRouter>
          <TasksPage />
        </BrowserRouter>
      </ApolloProvider>
    )

    expect(container).toMatchSnapshot()
  })

  it('has the title', () => {
    const { getByText } = render(
      <ApolloProvider client={client}>
        <BrowserRouter>
          <TasksPage />
        </BrowserRouter>
      </ApolloProvider>
    )

    expect(getByText('Tasks')).toBeInTheDocument()
  })
})

describe('SingleTask', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <ApolloProvider client={client}>
        <BrowserRouter>
          <SingleTask
            id={tasks[0].id}
            title={tasks[0].title}
            date={tasks[0].date}
            done={tasks[0].done}
            category={tasks[0].category}
          />
        </BrowserRouter>
      </ApolloProvider>
    )

    expect(container).toMatchSnapshot()
  })

  it('has all the content of the task', () => {
    const { getByText } = render(
      <ApolloProvider client={client}>
        <BrowserRouter>
          <SingleTask
            id={tasks[0].id}
            title={tasks[0].title}
            date={tasks[0].date}
            done={tasks[0].done}
            category={tasks[0].category}
          />
        </BrowserRouter>
      </ApolloProvider>
    )

    expect(getByText('Ir às compras')).toBeInTheDocument()
    expect(getByText('14 Aug')).toBeInTheDocument()
    expect(getByText('Waiting for')).toBeInTheDocument()
  })
})

describe('TasksSettings', () => {
  it('matches snashot', () => {
    const { container } = render(
      <ApolloProvider client={client}>
        <TasksSettings tags={tasksCategories} />
      </ApolloProvider>
    )

    expect(container).toMatchSnapshot()
  })

  it('has all the fields', () => {
    const { getByText } = render(
      <ApolloProvider client={client}>
        <TasksSettings tags={tasksCategories} />
      </ApolloProvider>
    )

    expect(getByText('Sort by')).toBeInTheDocument()
    expect(getByText('Font size')).toBeInTheDocument()
    expect(getByText('Categories')).toBeInTheDocument()
  })

  it('shows tags', () => {
    const { getByText } = render(
      <ApolloProvider client={client}>
        <TasksSettings categories={tasksCategories} />
      </ApolloProvider>
    )

    expect(getByText('Waiting for')).toBeInTheDocument()
    expect(getByText('House')).toBeInTheDocument()
    expect(getByText('Trackit')).toBeInTheDocument()
    expect(getByText('Stuff')).toBeInTheDocument()
  })
})
