import React, { useState, useEffect, useCallback } from 'react'
import DatePickerInput from '../misc/DatePickerInput'
import { Styled } from '../../styles/Add.styles'
import { TaskStatus } from './TaskStatus'
import { AddSubmitButton } from '../misc/Add'
import { CustomAddSelect } from '../misc/CustomAddSelect'
import { CustomAddDatePicker } from '../misc/CustomAddDatePicker'
import { LoadingSpinner } from '../misc/LoadingSpinner'
import { ReactComponent as NotesIcon } from '../../assets/icons/notes.svg'
import { TaskCategory } from '../../utils/ModuleTypes'
import { TASKS, CATEGORIES, SINGLE_TASK } from '../../utils/queries'
import { parseDate, parseDateInverse } from '../../utils/dateHelpers'
import { DrawerAddModuleProps } from '../misc/Add'
import { ReactComponent as ErrorIcon } from '../../assets/icons/error.svg'
import { ReactComponent as CheckIcon } from '../../assets/icons/check.svg'
import { gql, useMutation, useQuery, useLazyQuery } from '@apollo/client'
import { atom, useRecoilState } from 'recoil'

const CREATE_TASK = gql`
  mutation CreateTask($title: String!, $date: String!, $category: ID) {
    createTask(title: $title, date: $date, category: $category) {
      id_task
      title_task
    }
  }
`

const UPDATE_TASK = gql`
  mutation UpdateTask(
    $id: ID!
    $title: String
    $date: String
    $done: Boolean
    $category: ID
  ) {
    updateTask(
      id: $id
      title: $title
      date: $date
      done: $done
      category: $category
    ) {
      id_task
      title_task
    }
  }
`

export const taskIdState = atom({
  key: 'taskId',
  default: ''
})

export const taskTitleState = atom({
  key: 'taskTitle',
  default: ''
})

export const taskCategoryState = atom({
  key: 'taskCategory',
  default: '0'
})

export const taskDateState = atom({
  key: 'taskDate',
  default: new Date()
})

export const taskDoneState = atom({
  key: 'taskDone',
  default: false
})

const AddTask: React.FC<DrawerAddModuleProps> = ({ closeModal, isEdit }) => {
  const [taskId, setTaskId] = useRecoilState(taskIdState)
  const [title, setTitle] = useRecoilState(taskTitleState)
  const [category, setCategory] = useRecoilState(taskCategoryState)
  const [dueDate, setDueDate] = useRecoilState(taskDateState)
  const [done, setDone] = useRecoilState(taskDoneState)

  const [message, setMessage] = useState('')

  const { refetch: refetchTasks } = useQuery(TASKS)
  const { loading: loadingCategories, data: categories } = useQuery(CATEGORIES)

  const [createTask, { error, loading }] = useMutation(CREATE_TASK, {
    variables: {
      title: title,
      date: dueDate,
      category: category !== '0' ? category : null
    }
  })

  const [updateTask, { error: errorEdit, loading: loadingEdit }] = useMutation(
    UPDATE_TASK,
    {
      variables: {
        id: taskId,
        title: title,
        date: dueDate,
        done: done,
        category: category
      }
    }
  )

  const [
    getTask,
    { error: errorGet, loading: loadingGet, data: dataTask }
  ] = useLazyQuery(SINGLE_TASK, {
    variables: {
      id: taskId
    }
  })

  const categoryOptions = categories
    ? [
        { val: '0', label: 'Inbox' },
        ...(categories.categories as TaskCategory[]).map(cat => ({
          val: cat.id,
          label: cat.name
        }))
      ]
    : [{ val: '0', label: 'Inbox' }]

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value)
  }

  const cleanData = useCallback(() => {
    setTaskId('')
    setTitle('')
    setCategory('0')
    setDueDate(new Date())
    setDone(false)
    setMessage('')
  }, [setTaskId, setTitle, setCategory, setDueDate, setMessage, setDone])

  const handleSubmit = () => {
    if (isEdit) {
      updateTask()
        .then(res => {
          setMessage('Your note was edited')
          refetchTasks()
          setTimeout(() => {
            closeModal()
            cleanData()
          }, 1500)
        })
        .catch(err => console.log(err.message))
    } else {
      createTask()
        .then(res => {
          setMessage('Note created with success!')
          refetchTasks()
          setTimeout(() => {
            closeModal()
            cleanData()
          }, 1500)
        })
        .catch(err => console.log(err.message))
    }
  }

  useEffect(() => {
    if (taskId) {
      getTask()
    }
  }, [taskId, getTask])

  useEffect(() => {
    if (dataTask && dataTask.singleTask) {
      const { title, category, date, done } = dataTask.singleTask
      setTitle(title)
      setDueDate(parseDate(parseDateInverse(date)))
      setDone(done)
      category && setCategory(category.id)
    }
  }, [dataTask, setTitle, setCategory, setDueDate, setDone])

  useEffect(() => () => cleanData(), [cleanData])

  const isLoading = loading || loadingCategories || loadingEdit || loadingGet

  const errors = error
    ? error
    : errorEdit
    ? errorEdit
    : errorGet
    ? errorGet
    : null

  return isLoading ? (
    <Styled.AddLoading>
      <LoadingSpinner />
    </Styled.AddLoading>
  ) : errors ? (
    <Styled.AddMessage>
      <ErrorIcon />
      <p>{errors.message}</p>
    </Styled.AddMessage>
  ) : message ? (
    <Styled.AddMessage>
      <CheckIcon />
      <p>{message}</p>
    </Styled.AddMessage>
  ) : (
    <>
      <Styled.AddInputWrapper>
        {isEdit && <TaskStatus onClick={() => setDone(!done)} isDone={done} />}
        <Styled.AddInput
          type="text"
          placeholder="Ex: Take out the trash"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </Styled.AddInputWrapper>

      <Styled.AddWidgetsContainer>
        <Styled.AddWidget>
          <DatePickerInput
            date={dueDate}
            setDate={setDueDate}
            customInput={<CustomAddDatePicker />}
          />
        </Styled.AddWidget>

        <Styled.AddWidget>
          <CustomAddSelect
            id="add-category"
            value={category}
            onChange={handleCategoryChange}
            options={categoryOptions}
            icon={<NotesIcon />}
          />
        </Styled.AddWidget>

        <AddSubmitButton handleSubmit={handleSubmit} />
      </Styled.AddWidgetsContainer>
    </>
  )
}

export default AddTask
