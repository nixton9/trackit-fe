import React, { useState } from 'react'
import { AddSubmitButton } from '../misc/Add'
import { LoadingSpinner } from '../misc/LoadingSpinner'
import { DrawerAddModuleProps } from '../misc/Add'
import { Styled } from '../../styles/Add.styles'
import { HABITS } from '../../utils/queries'
import { ReactComponent as ErrorIcon } from '../../assets/icons/error.svg'
import { ReactComponent as CheckIcon } from '../../assets/icons/check.svg'
import { gql, useMutation, useQuery } from '@apollo/client'

const CREATE_HABIT = gql`
  mutation CreateHabit($title: String!) {
    createHabit(title: $title) {
      id_habit
    }
  }
`

const AddHabit: React.FC<DrawerAddModuleProps> = ({ closeModal }) => {
  const [title, setTitle] = useState('')

  const [message, setMessage] = useState('')

  const { refetch: refetchHabits } = useQuery(HABITS)
  const [createHabit, { error, loading }] = useMutation(CREATE_HABIT, {
    variables: { title: title }
  })

  const handleSubmit = () => {
    createHabit()
      .then(res => {
        setMessage('Habit created!')
        refetchHabits()
        setTimeout(() => {
          closeModal()
          setMessage('')
        }, 1500)
      })
      .catch(err => console.log(err.message))
  }

  return loading ? (
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
