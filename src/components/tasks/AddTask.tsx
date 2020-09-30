import React, { useState } from 'react'
import DatePickerInput from '../misc/DatePickerInput'
import { Styled } from '../../styles/Add.styles'
import { AddSubmitButton } from '../misc/Add'
import { CustomAddSelect } from '../misc/CustomAddSelect'
import { CustomAddDatePicker } from '../misc/CustomAddDatePicker'
import { LoadingSpinner } from '../misc/LoadingSpinner'
import { ReactComponent as NotesIcon } from '../../assets/icons/notes.svg'
import { TaskCategory } from '../../utils/ModuleTypes'
import { TASKS, CATEGORIES } from '../../utils/queries'
import { DrawerAddModuleProps } from '../misc/Add'
import { ReactComponent as ErrorIcon } from '../../assets/icons/error.svg'
import { ReactComponent as CheckIcon } from '../../assets/icons/check.svg'
import { gql, useMutation, useQuery } from '@apollo/client'

const CREATE_TASK = gql`
  mutation CreateTask($title: String!, $date: String!, $category: ID) {
    createTask(title: $title, date: $date, category: $category) {
      id_task
      title_task
    }
  }
`

const AddTask: React.FC<DrawerAddModuleProps> = ({ closeModal }) => {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('0')
  const [dueDate, setDueDate] = useState(new Date())

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

  const handleSubmit = () => {
    createTask()
      .then(res => {
        setMessage('Note created with success!')
        refetchTasks()
        setTimeout(() => {
          closeModal()
          setMessage('')
        }, 1500)
      })
      .catch(err => console.log(err.message))
  }

  return loading || loadingCategories ? (
    <Styled.AddLoading>
      <LoadingSpinner />
    </Styled.AddLoading>
  ) : error ? (
    <Styled.AddMessage>
      <ErrorIcon />
      <p>{error.message}</p>
    </Styled.AddMessage>
  ) : message ? (
    <Styled.AddMessage>
      <CheckIcon />
      <p>{message}</p>
    </Styled.AddMessage>
  ) : (
    <>
      <Styled.AddInput
        type="text"
        placeholder="Ex: Take out the trash"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

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
