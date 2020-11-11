import React, { useState, useEffect, useCallback } from 'react'
import DatePickerInput from '../misc/DatePickerInput'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { Styled } from '../../styles/Add.styles'
import { TaskStatus } from './TaskStatus'
import { AddSubmitButton } from '../misc/Add'
import { CustomAddSelect } from '../misc/CustomAddSelect'
import { CustomAddDatePicker } from '../misc/CustomAddDatePicker'
import { ThreeDotsMenu } from '../misc/ThreeDotsMenu'
import { LoadingSpinner } from '../misc/LoadingSpinner'
import { NotificationTypes, notificationState } from '../misc/Notification'
import { alertState } from '../misc/Alert'
import { ReactComponent as NotesIcon } from '../../assets/icons/notes.svg'
import { ReactComponent as CalendarIcon } from '../../assets/icons/calendr.svg'
import { TaskCategory } from '../../utils/ModuleTypes'
import { TASKS, CATEGORIES, SINGLE_TASK } from '../../utils/queries'
import {
  parseDate,
  parseDateInverse,
  displayDate,
  displayDateString
} from '../../utils/dateHelpers'
import { DrawerAddModuleProps } from '../misc/Add'
import { gql, useMutation, useQuery, useLazyQuery } from '@apollo/client'
import { atom, useRecoilState, useSetRecoilState } from 'recoil'
import { addDays } from 'date-fns'

const CREATE_TASK = gql`
  mutation CreateTask($title: String!, $date: String, $category: ID) {
    createTask(title: $title, date: $date, category: $category) {
      id_task
      title_task
    }
  }
`

const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id) {
      id_task
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
const now = new Date()

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
  default: now
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

  const [dateSelect, setDateSelect] = useState('1')

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  const setNotification = useSetRecoilState(notificationState)
  const setAlert = useSetRecoilState(alertState)

  const { refetch: refetchTasks } = useQuery(TASKS)
  const { loading: loadingCategories, data: categories } = useQuery(CATEGORIES)

  const [createTask, { loading }] = useMutation(CREATE_TASK)

  const [deleteTask, { loading: loadingDelete }] = useMutation(DELETE_TASK, {
    variables: {
      id: taskId
    }
  })

  const [updateTask, { loading: loadingEdit }] = useMutation(UPDATE_TASK, {
    variables: {
      id: taskId,
      title: title,
      date: dueDate,
      done: done,
      category: category
    }
  })

  const [getTask, { loading: loadingGet, data: dataTask }] = useLazyQuery(
    SINGLE_TASK,
    {
      variables: {
        id: taskId
      },
      fetchPolicy: 'network-only'
    }
  )

  const categoryOptions = categories
    ? [
        { val: '0', label: 'Inbox' },
        ...(categories.categories as TaskCategory[]).map(cat => ({
          val: cat.id,
          label: cat.name
        }))
      ]
    : [{ val: '0', label: 'Inbox' }]

  const handleDateSelectChange = (e: any) => {
    setDateSelect(e.target.value)
  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value)
  }

  const cleanData = useCallback(() => {
    setTaskId('')
    setTitle('')
    setCategory('0')
    setDueDate(new Date())
    setDone(false)
  }, [setTaskId, setTitle, setCategory, setDueDate, setDone])

  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault()
    if (title) {
      if (isEdit) {
        updateTask()
          .then(res => {
            setNotification({
              text: `Task was successfully updated`,
              type: NotificationTypes.Success
            })
            refetchTasks()
            closeModal()
            cleanData()
          })
          .catch(err =>
            setNotification({
              text: 'There was a problem, please try again',
              type: NotificationTypes.Error
            })
          )
      } else {
        createTask({
          variables: {
            title: title,
            date: dateSelect === '4' ? null : dueDate,
            category: category !== '0' ? category : null
          }
        })
          .then(res => {
            console.log(dueDate)
            setNotification({
              text: `New task added ${
                dateSelect !== '4' &&
                displayDateString(parseDateInverse(dueDate))
              }`,
              type: NotificationTypes.Success
            })
            refetchTasks()
            closeModal()
            cleanData()
          })
          .catch(err =>
            setNotification({
              text: 'There was a problem, please try again',
              type: NotificationTypes.Error
            })
          )
      }
    } else {
      setNotification({
        text: `You need to insert a title for your task`,
        type: NotificationTypes.Error
      })
    }
  }

  const handleDeleteConfirm = () => {
    setAlert({
      text: 'This task will be removed.',
      onConfirm: handleDeleteTask
    })
  }

  const handleDeleteTask = () => {
    deleteTask()
      .then(res => {
        setNotification({
          text: `Task was deleted`,
          type: NotificationTypes.Success
        })
        refetchTasks()
        closeModal()
        cleanData()
      })
      .catch(err =>
        setNotification({
          text: 'There was a problem, please try again',
          type: NotificationTypes.Error
        })
      )
  }

  const cancelOption = {
    label: 'Cancel',
    onClick: () => {
      closeModal()
      cleanData()
    }
  }

  const menuOptions = isEdit
    ? [{ label: 'Delete task', onClick: handleDeleteConfirm }, cancelOption]
    : [cancelOption]

  const clickDateInput = () => {
    const input = document.querySelector(
      '.tasks-add-date .react-datepicker__input-container input'
    ) as any
    input && input.click()
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

  useEffect(() => {
    if (dateSelect === '1') {
      setDueDate(now)
    } else if (dateSelect === '2') {
      setDueDate(addDays(now, 1))
    }
  }, [dateSelect, setDueDate])

  const isLoading =
    loading || loadingCategories || loadingEdit || loadingGet || loadingDelete

  return isLoading ? (
    <Styled.AddLoading>
      <LoadingSpinner />
    </Styled.AddLoading>
  ) : (
    <>
      <ThreeDotsMenu options={menuOptions} />

      <form onSubmit={handleSubmit}>
        <Styled.AddInputWrapper>
          <Styled.AddInput__Label>Title</Styled.AddInput__Label>
          <Styled.AddInput
            type="text"
            placeholder="Ex: Take out the trash"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          {isEdit && (
            <TaskStatus onClick={() => setDone(!done)} isDone={done} />
          )}
        </Styled.AddInputWrapper>

        <Styled.AddWidgetsContainer>
          <Styled.AddWidget onClick={clickDateInput}>
            <span>{<CalendarIcon />}</span>
            <Select
              value={dateSelect}
              onChange={handleDateSelectChange}
              disableUnderline
            >
              <MenuItem value={'1'}>Today</MenuItem>
              <MenuItem value={'2'}>Tomorrow</MenuItem>
              <MenuItem value={'3'} onClick={() => setIsDatePickerOpen(true)}>
                {dueDate === now
                  ? 'Custom Date'
                  : displayDate(parseDateInverse(dueDate))}
              </MenuItem>
              <MenuItem value={'4'}>No Date</MenuItem>
            </Select>
            <DatePickerInput
              date={new Date(dueDate)}
              setDate={setDueDate}
              customInput={<CustomAddDatePicker showIcon={false} />}
              classname="tasks-add-date"
              open={isDatePickerOpen}
              onClose={() => setIsDatePickerOpen(false)}
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

          <AddSubmitButton />
        </Styled.AddWidgetsContainer>
      </form>
    </>
  )
}

export default AddTask
