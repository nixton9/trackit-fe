import React, { useEffect, useCallback } from 'react'
import DatePickerInput from '../misc/DatePickerInput'
import { Styled } from '../../styles/Add.styles'
import { FluidInput } from '../misc/FluidInput'
import { AddSubmitButton } from '../misc/Add'
import { CustomAddSelect } from '../misc/CustomAddSelect'
import { CustomAddDatePicker } from '../misc/CustomAddDatePicker'
import { ThreeDotsMenu } from '../misc/ThreeDotsMenu'
import { LoadingSpinner } from '../misc/LoadingSpinner'
import { NotificationTypes, notificationState } from '../misc/Notification'
import { alertState } from '../misc/Alert'
import { ReactComponent as NotesIcon } from '../../assets/icons/notes.svg'
import { ExpenseType } from '../../utils/ModuleTypes'
import { DrawerAddModuleProps } from '../misc/Add'
import { EXPENSES, TYPES, SINGLE_EXPENSE } from '../../utils/queries'
import { gql, useMutation, useQuery, useLazyQuery } from '@apollo/client'
import { atom, useRecoilState, useSetRecoilState } from 'recoil'
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

const DELETE_EXPENSE = gql`
  mutation DeleteExpense($id: ID!) {
    deleteExpense(id: $id) {
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

  const setNotification = useSetRecoilState(notificationState)
  const setAlert = useSetRecoilState(alertState)

  const { refetch: refetchExpenses } = useQuery(EXPENSES)
  const { loading: loadingTypes, data: types } = useQuery(TYPES)

  const [createExpense, { loading }] = useMutation(CREATE_EXPENSE, {
    variables: {
      title: title,
      date: date,
      value: Number(value),
      type: type !== '0' ? type : null
    }
  })

  const [deleteExpense, { loading: loadingDelete }] = useMutation(
    DELETE_EXPENSE,
    {
      variables: {
        id: expenseId
      }
    }
  )

  const [updateExpense, { loading: loadingEdit }] = useMutation(
    UPDATE_EXPENSE,
    {
      variables: {
        id: expenseId,
        title: title,
        date: date,
        value: Number(value),
        type: type
      }
    }
  )

  const [getExpense, { loading: loadingGet, data: dataExpense }] = useLazyQuery(
    SINGLE_EXPENSE,
    {
      variables: {
        id: expenseId
      },
      fetchPolicy: 'network-only'
    }
  )

  const cleanData = useCallback(() => {
    setExpenseId('')
    setValue(undefined)
    setTitle('')
    setType('0')
    setDate(new Date())
  }, [setExpenseId, setValue, setTitle, setType, setDate])

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

  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault()
    if (value) {
      if (isEdit) {
        updateExpense()
          .then(res => {
            setNotification({
              text: `Expense was successfully updated`,
              type: NotificationTypes.Success
            })
            refetchExpenses()
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
        createExpense()
          .then(res => {
            setNotification({
              text: `New expense added for ${value}$`,
              type: NotificationTypes.Success
            })
            refetchExpenses()
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
        text: `You need to insert a value for your expense`,
        type: NotificationTypes.Error
      })
    }
  }

  const handleDeleteConfirm = () => {
    setAlert({
      text: 'This expense will be removed.',
      onConfirm: handleDeleteExpense
    })
  }

  const handleDeleteExpense = () => {
    deleteExpense()
      .then(res => {
        setNotification({
          text: `Expense was deleted`,
          type: NotificationTypes.Success
        })
        refetchExpenses()
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
    ? [{ label: 'Delete expense', onClick: handleDeleteConfirm }, cancelOption]
    : [cancelOption]

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

  const isLoading =
    loading || loadingTypes || loadingEdit || loadingGet || loadingDelete

  return isLoading ? (
    <Styled.AddLoading>
      <LoadingSpinner />
    </Styled.AddLoading>
  ) : (
    <>
      <ThreeDotsMenu options={menuOptions} />

      <form onSubmit={handleSubmit}>
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

          <AddSubmitButton />
        </Styled.AddWidgetsContainer>
      </form>
    </>
  )
}

export default AddExpense
