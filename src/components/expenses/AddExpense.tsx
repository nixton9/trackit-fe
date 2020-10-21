import React, { useState, useEffect, useCallback } from 'react'
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
import { EXPENSES, TYPES, SINGLE_EXPENSE } from '../../utils/queries'
import { gql, useMutation, useQuery, useLazyQuery } from '@apollo/client'
import { atom, useRecoilState } from 'recoil'
import { parseDate, parseDateInverse } from '../../utils/dateHelpers'

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

const UPDATE_EXPENSE = gql`
  mutation UpdateExpense(
    $id: ID!
    $title: String
    $date: String
    $value: Float
    $type: ID
  ) {
    updateExpense(
      id: $id
      title: $title
      date: $date
      value: $value
      type: $type
    ) {
      id_expense
    }
  }
`

export const expenseIdState = atom({
  key: 'expenseId',
  default: ''
})

export const expenseValueState = atom<number | string | undefined>({
  key: 'expenseValue',
  default: undefined
})

export const expenseTitleState = atom({
  key: 'expenseTitle',
  default: ''
})

export const expenseTypeState = atom({
  key: 'expenseType',
  default: '0'
})

export const expenseDateState = atom({
  key: 'expenseDate',
  default: new Date()
})

const AddExpense: React.FC<DrawerAddModuleProps> = ({ closeModal, isEdit }) => {
  const [expenseId, setExpenseId] = useRecoilState(expenseIdState)
  const [value, setValue] = useRecoilState(expenseValueState)
  const [title, setTitle] = useRecoilState(expenseTitleState)
  const [type, setType] = useRecoilState(expenseTypeState)
  const [date, setDate] = useRecoilState(expenseDateState)

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

  const [
    updateExpense,
    { error: errorEdit, loading: loadingEdit }
  ] = useMutation(UPDATE_EXPENSE, {
    variables: {
      id: expenseId,
      title: title,
      date: date,
      value: Number(value),
      type: type
    }
  })

  const [
    getExpense,
    { error: errorGet, loading: loadingGet, data: dataExpense }
  ] = useLazyQuery(SINGLE_EXPENSE, {
    variables: {
      id: expenseId
    }
  })

  const cleanData = useCallback(() => {
    setExpenseId('')
    setValue(undefined)
    setTitle('')
    setType('0')
    setDate(new Date())
    setMessage('')
  }, [setExpenseId, setValue, setTitle, setType, setDate, setMessage])

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
    if (isEdit) {
      updateExpense()
        .then(res => {
          setMessage('Expense edited')
          refetchExpenses()
          setTimeout(() => {
            closeModal()
            cleanData()
          }, 1500)
        })
        .catch(err => console.log(err.message))
    } else {
      createExpense()
        .then(res => {
          setMessage('Expense successfully added!')
          refetchExpenses()
          setTimeout(() => {
            closeModal()
            cleanData()
          }, 1500)
        })
        .catch(err => console.log(err.message))
    }
  }

  useEffect(() => {
    if (expenseId) {
      getExpense()
    }
  }, [expenseId, getExpense])

  useEffect(() => {
    if (dataExpense && dataExpense.singleExpense) {
      const { title, value, type, date } = dataExpense.singleExpense
      setTitle(title)
      setValue(value)
      setDate(parseDate(parseDateInverse(date)))
      type && setType(type.id)
    }
  }, [dataExpense, setTitle, setValue, setDate, setType])

  useEffect(() => () => cleanData(), [cleanData])

  const isLoading = loading || loadingTypes || loadingEdit || loadingGet

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
