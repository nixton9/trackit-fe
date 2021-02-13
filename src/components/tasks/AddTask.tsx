import React, { useState, useEffect, useCallback, useRef } from 'react'
import DatePickerInput from '../misc/DatePickerInput'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { Styled } from '../../styles/Add.styles'
import { TaskStatus } from './TaskStatus'
import { SubmitButton } from '../misc/SubmitButton'
import { CustomAddSelect } from '../misc/CustomAddSelect'
import { CustomAddDatePicker } from '../misc/CustomAddDatePicker'
import { ThreeDotsMenu } from '../misc/ThreeDotsMenu'
import { LoadingSpinner } from '../misc/LoadingSpinner'
import { NotificationTypes, notificationState } from '../misc/Notification'
import { alertState } from '../misc/Alert'
import { ReactComponent as CategoriesIcon } from '../../assets/icons/categories.svg'
import { ReactComponent as CalendarIcon } from '../../assets/icons/calendar.svg'
import { TaskCategory } from '../../utils/ModuleTypes'
import { TASKS, CATEGORIES, SINGLE_TASK } from '../../utils/queries'
import { CREATE_TASK, DELETE_TASK, UPDATE_TASK } from '../../utils/mutations'
import {
  taskIdState,
  taskTitleState,
  taskCategoryState,
  taskDateState,
  taskDoneState
} from '../../utils/atoms'
import {
  parseDate,
  parseDateInverse,
  displayDate,
  displayDateString
} from '../../utils/dateHelpers'
import { DrawerAddModuleProps } from '../misc/Add'
import { useMutation, useQuery, useLazyQuery } from '@apollo/client'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { addDays } from 'date-fns'
import { useHistory } from 'react-router-dom'

const NOW = new Date()

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

  const titleRef: React.RefObject<HTMLInputElement> = useRef(null)
  const history = useHistory()

  const categoryOptions = categories
    ? [
        { val: '0', label: 'Inbox' },
        ...(categories.categories as TaskCategory[])
          .map(cat => ({
            val: cat.id,
            label: cat.name
          }))
          .sort((a, b) =>
            a.label.toUpperCase() < b.label.toUpperCase()
              ? -1
              : a.label.toUpperCase() > b.label.toUpperCase()
              ? 1
              : 0
          )
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
            refetchTasks({
              variables: { done: !done }
            })
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
            setNotification({
              text: `New task added ${
                dateSelect !== '4'
                  ? `for ${displayDateString(parseDateInverse(dueDate))}`
                  : ''
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
      text: 'This task will be removed',
      onConfirm: handleDeleteTask
    })
  }

  const handleDeleteTask = () => {
    deleteTask()
      .then(res => {
        setNotification({
          text: `Task '${title}' was deleted`,
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

  const clickDateInput = (e: React.ChangeEvent<EventTarget>) => {
    e.preventDefault()
    const input = document.querySelector(
      '.tasks-add-date .react-datepicker__input-container input'
    ) as any
    input && input.click()
  }

  useEffect(() => {
    if (titleRef && titleRef.current) {
      titleRef.current.focus()
    }

    history.push(`#`)

    window.onpopstate = (e: any) => {
      closeModal()
      cleanData()
    }
  }, [closeModal, cleanData, history])

  useEffect(() => {
    if (taskId) {
      getTask()
    }
  }, [taskId, getTask])

  useEffect(() => {
    if (dataTask && dataTask.singleTask) {
      const { title, category, date, done } = dataTask.singleTask
      setTitle(title)
      setDueDate(
        date
          ? parseDate(parseDateInverse(date))
          : parseDate(parseDateInverse(NOW))
      )
      setDateSelect(date ? '3' : '4')
      setDone(done)
      category && setCategory(category.id)
    }
  }, [dataTask, setTitle, setCategory, setDueDate, setDone])

  useEffect(() => () => cleanData(), [cleanData])

  useEffect(() => {
    if (dateSelect === '1') {
      setDueDate(NOW)
    } else if (dateSelect === '2') {
      setDueDate(addDays(NOW, 1))
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
            ref={titleRef}
            data-test-id="add-task-title-input"
          />
          {isEdit && (
            <TaskStatus onClick={() => setDone(!done)} isDone={done} />
          )}
        </Styled.AddInputWrapper>

        <Styled.AddWidgetsContainer>
          <Styled.AddWidget
            onClick={clickDateInput}
            className={isDatePickerOpen ? 'has-datepicker' : 'no-datepicker'}
          >
            <span>{<CalendarIcon />}</span>
            <Select
              value={dateSelect}
              onChange={handleDateSelectChange}
              disableUnderline
              data-test-id="add-task-date-input"
            >
              <MenuItem value={'1'}>Today</MenuItem>
              <MenuItem value={'2'}>Tomorrow</MenuItem>
              <MenuItem value={'3'} onClick={() => setIsDatePickerOpen(true)}>
                {dueDate === NOW
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
              onChangeRaw={() => setIsDatePickerOpen(false)}
            />
          </Styled.AddWidget>

          <Styled.AddWidget>
            <CustomAddSelect
              id="add-category"
              value={category}
              onChange={handleCategoryChange}
              options={categoryOptions}
              icon={<CategoriesIcon />}
            />
          </Styled.AddWidget>

          <SubmitButton />
        </Styled.AddWidgetsContainer>
      </form>
    </>
  )
}

export default AddTask
