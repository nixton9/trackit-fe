import React, { useState, useEffect, useCallback } from 'react'
import { AddSubmitButton } from '../misc/Add'
import { LoadingSpinner } from '../misc/LoadingSpinner'
import { DrawerAddModuleProps } from '../misc/Add'
import { Styled } from '../../styles/Add.styles'
import { HABITS, SINGLE_HABIT } from '../../utils/queries'
import { ReactComponent as ErrorIcon } from '../../assets/icons/error.svg'
import { ReactComponent as CheckIcon } from '../../assets/icons/check.svg'
import { gql, useMutation, useQuery, useLazyQuery } from '@apollo/client'
import { atom, useRecoilState } from 'recoil'

const CREATE_HABIT = gql`
  mutation CreateHabit($title: String!) {
    createHabit(title: $title) {
      id_habit
    }
  }
`

const UPDATE_HABIT = gql`
  mutation UpdateHabit($id: ID!, $title: String) {
    updateHabit(id: $id, title: $title) {
      id_habit
    }
  }
`

export const habitIdState = atom({
  key: 'habitId',
  default: ''
})

export const habitTitleState = atom({
  key: 'habitTitle',
  default: ''
})

const AddHabit: React.FC<DrawerAddModuleProps> = ({ closeModal, isEdit }) => {
  const [habitId, setHabitId] = useRecoilState(habitIdState)
  const [title, setTitle] = useRecoilState(habitTitleState)

  const [message, setMessage] = useState('')

  const { refetch: refetchHabits } = useQuery(HABITS)

  const [createHabit, { error, loading }] = useMutation(CREATE_HABIT, {
    variables: { title: title }
  })

  const [updateHabit, { error: errorEdit, loading: loadingEdit }] = useMutation(
    UPDATE_HABIT,
    {
      variables: { id: habitId, title: title }
    }
  )

  const [
    getHabit,
    { error: errorGet, loading: loadingGet, data: dataHabit }
  ] = useLazyQuery(SINGLE_HABIT, {
    variables: {
      id: habitId
    }
  })

  const cleanData = useCallback(() => {
    setHabitId('')
    setTitle('')
    setMessage('')
  }, [setHabitId, setTitle, setMessage])

  const handleSubmit = () => {
    if (isEdit) {
      updateHabit()
        .then(res => {
          setMessage('Your habit was edited')
          refetchHabits()
          setTimeout(() => {
            closeModal()
            cleanData()
          }, 1500)
        })
        .catch(err => console.log(err.message))
    } else {
      createHabit()
        .then(res => {
          setMessage('Habit created!')
          refetchHabits()
          setTimeout(() => {
            closeModal()
            cleanData()
          }, 1500)
        })
        .catch(err => console.log(err.message))
    }
  }

  useEffect(() => {
    if (habitId) {
      getHabit()
    }
  }, [habitId, getHabit])

  useEffect(() => {
    if (dataHabit && dataHabit.singleHabit) {
      setTitle(dataHabit.singleHabit.title)
    }
  }, [dataHabit, setTitle])

  useEffect(() => () => cleanData(), [cleanData])

  const isLoading = loading || loadingEdit || loadingGet

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
      <Styled.AddInput
        type="text"
        placeholder="Ex: Eat healthy"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <Styled.AddWidgetsContainer>
        <AddSubmitButton handleSubmit={handleSubmit} />
      </Styled.AddWidgetsContainer>
    </>
  )
}

export default AddHabit
