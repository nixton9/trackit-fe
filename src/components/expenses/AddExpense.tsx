import React, { useState } from 'react'
import DatePickerInput from '../misc/DatePickerInput'
import { Styled } from '../../styles/Add.styles'
import { FluidInput } from '../misc/FluidInput'
import { AddSubmitButton } from '../misc/Add'
import { CustomAddSelect } from '../misc/CustomAddSelect'
import { CustomAddDatePicker } from '../misc/CustomAddDatePicker'
import { LoadingSpinner } from '../misc/LoadingSpinner'
import { ReactComponent as NotesIcon } from '../../assets/icons/notes.svg'
import { ExpenseType } from '../../utils/ModuleTypes'
import { DrawerAddModuleProps } from '../misc/Add'
import { ReactComponent as ErrorIcon } from '../../assets/icons/error.svg'
import { ReactComponent as CheckIcon } from '../../assets/icons/check.svg'
import { EXPENSES, TYPES } from '../../utils/queries'
import { gql, useMutation, useQuery } from '@apollo/client'

const CREATE_EXPENSE = gql`
  mutation CreateExpense(
    $title: String!
    $date: String!
    $value: Float!
    $type: ID
  ) {
    createExpense(title: $title, date: $date, value: $value, type: $type) {
      id_expense
    }
  }
`

const AddExpense: React.FC<DrawerAddModuleProps> = ({ closeModal }) => {
  const [value, setValue] = useState<number | string | undefined>(undefined)
  const [title, setTitle] = useState('')
  const [type, setType] = useState('0')
  const [date, setDate] = useState(new Date())

  const [message, setMessage] = useState('')

  const { refetch: refetchExpenses } = useQuery(EXPENSES)
  const { loading: loadingTypes, data: types } = useQuery(TYPES)
  const [createExpense, { error, loading }] = useMutation(CREATE_EXPENSE, {
    variables: {
      title: title,
      date: date,
      value: Number(value),
      type: type !== '0' ? type : null
    }
  })

  const typeOptions = types
    ? [
        { val: '0', label: 'All' },
        ...(types.types as ExpenseType[]).map(type => ({
          val: type.id,
          label: type.name
        }))
      ]
    : [{ val: '0', label: 'All' }]

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value)
  }

  const handleSubmit = () => {
    createExpense()
      .then(res => {
        setMessage('Expense successfully added!')
        refetchExpenses()
        setTimeout(() => {
          closeModal()
          setMessage('')
        }, 1500)
      })
      .catch(err => console.log(err.message))
  }

  return loading || loadingTypes ? (
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
            id="add-type"
            value={type}
            onChange={handleTypeChange}
            options={typeOptions}
            icon={<NotesIcon />}
          />
        </Styled.AddWidget>

        <AddSubmitButton handleSubmit={handleSubmit} />
      </Styled.AddWidgetsContainer>
    </>
  )
}

export default AddExpense
