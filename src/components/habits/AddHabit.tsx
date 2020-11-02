import React, { useEffect, useCallback } from 'react'
import { AddSubmitButton } from '../misc/Add'
import { ThreeDotsMenu } from '../misc/ThreeDotsMenu'
import { LoadingSpinner } from '../misc/LoadingSpinner'
import { DrawerAddModuleProps } from '../misc/Add'
import { NotificationTypes, notificationState } from '../misc/Notification'
import { alertState } from '../misc/Alert'
import { Styled } from '../../styles/Add.styles'
import { HABITS, SINGLE_HABIT } from '../../utils/queries'
import { gql, useMutation, useQuery, useLazyQuery } from '@apollo/client'
import { atom, useRecoilState, useSetRecoilState } from 'recoil'

const CREATE_HABIT = gql`
  mutation CreateHabit($title: String!) {
    createHabit(title: $title) {
      id_habit
    }
  }
`

const DELETE_HABIT = gql`
  mutation DeleteHabit($id: ID!) {
    deleteHabit(id: $id) {
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

  const setNotification = useSetRecoilState(notificationState)
  const setAlert = useSetRecoilState(alertState)

  const { refetch: refetchHabits } = useQuery(HABITS)

  const [createHabit, { loading }] = useMutation(CREATE_HABIT, {
    variables: { title: title }
  })

  const [deleteHabit, { loading: loadingDelete }] = useMutation(DELETE_HABIT, {
    variables: {
      id: habitId
    }
  })

  const [updateHabit, { loading: loadingEdit }] = useMutation(UPDATE_HABIT, {
    variables: { id: habitId, title: title }
  })

  const [getHabit, { loading: loadingGet, data: dataHabit }] = useLazyQuery(
    SINGLE_HABIT,
    {
      variables: {
        id: habitId
      },
      fetchPolicy: 'network-only'
    }
  )

  const cleanData = useCallback(() => {
    setHabitId('')
    setTitle('')
  }, [setHabitId, setTitle])

  const handleSubmit = () => {
    if (isEdit) {
      updateHabit()
        .then(res => {
          setNotification({
            text: `Habit was successfully updated`,
            type: NotificationTypes.Success
          })
          refetchHabits()
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
      createHabit()
        .then(res => {
          setNotification({
            text: `New habit created '${title}'`,
            type: NotificationTypes.Success
          })
          refetchHabits()
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
  }

  const handleDeleteConfirm = () => {
    setAlert({
      text: 'This habit will be removed.',
      onConfirm: handleDeleteHabit
    })
  }

  const handleDeleteHabit = () => {
    deleteHabit()
      .then(res => {
        setNotification({
          text: `Habit was deleted`,
          type: NotificationTypes.Success
        })
        refetchHabits()
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
    ? [{ label: 'Delete habit', onClick: handleDeleteConfirm }, cancelOption]
    : [cancelOption]

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

  const isLoading = loading || loadingEdit || loadingGet || loadingDelete

  return isLoading ? (
    <Styled.AddLoading>
      <LoadingSpinner />
    </Styled.AddLoading>
  ) : (
    <>
      <ThreeDotsMenu options={menuOptions} />
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
