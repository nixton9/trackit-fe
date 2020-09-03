import React, { useState } from 'react'
import DatePickerInput from '../misc/DatePickerInput'
import { Styled } from '../../styles/Add.styles'
import { AddSubmitButton } from '../misc/Add'
import { CustomAddSelect } from '../misc/CustomAddSelect'
import { CustomAddDatePicker } from '../misc/CustomAddDatePicker'
import { ReactComponent as NotesIcon } from '../../assets/icons/notes.svg'
import { tasksCategories } from '../../assets/fakeData'
import { TaskCategory } from '../../utils/ModuleTypes'

const AddTask: React.FC = () => {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('0')
  const [dueDate, setDueDate] = useState(new Date())

  const categoryOptions = [
    { val: '0', label: 'Inbox' },
    ...(tasksCategories as TaskCategory[]).map(cat => ({
      val: cat.id,
      label: cat.name
    }))
  ]

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value)
  }

  const handleSubmit = () => {
    console.log(title)
    console.log(category)
    console.log(dueDate)
  }

  return (
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
