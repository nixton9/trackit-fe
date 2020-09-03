import React, { useState } from 'react'
import DatePickerInput from '../misc/DatePickerInput'
import { Styled } from '../../styles/Add.styles'
import { FluidInput } from '../misc/FluidInput'
import { AddSubmitButton } from '../misc/Add'
import { CustomAddSelect } from '../misc/CustomAddSelect'
import { CustomAddDatePicker } from '../misc/CustomAddDatePicker'
import { ReactComponent as NotesIcon } from '../../assets/icons/notes.svg'
import { expensesCategories } from '../../assets/fakeData'
import { ExpenseCategory } from '../../utils/ModuleTypes'

const AddExpense: React.FC = () => {
  const [value, setValue] = useState<number | string | undefined>(undefined)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('0')
  const [date, setDate] = useState(new Date())

  const categoryOptions = [
    { val: '0', label: 'All' },
    ...(expensesCategories as ExpenseCategory[]).map(cat => ({
      val: cat.id,
      label: cat.name
    }))
  ]

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value)
  }

  const handleSubmit = () => {
    console.log(value)
    console.log(title)
    console.log(category)
    console.log(date)
  }

  return (
    <>
      <Styled.AddInputNumberWrapper>
        <FluidInput value={value} setValue={setValue} placeholder={'9.99'} />
        <span className={value ? 'active' : ''}>€</span>
      </Styled.AddInputNumberWrapper>

      <Styled.AddInput
        type="text"
        placeholder="Ex: Dinner at mcdonalds"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <Styled.AddWidgetsContainer>
        <Styled.AddWidget>
          <DatePickerInput
            date={date}
            setDate={setDate}
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

export default AddExpense
