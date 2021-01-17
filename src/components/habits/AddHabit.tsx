import React, { useEffect, useCallback, useRef } from 'react'
import { SubmitButton } from '../misc/SubmitButton'
import { ThreeDotsMenu } from '../misc/ThreeDotsMenu'
import { LoadingSpinner } from '../misc/LoadingSpinner'
import { DrawerAddModuleProps } from '../misc/Add'
import { NotificationTypes, notificationState } from '../misc/Notification'
import { alertState } from '../misc/Alert'
import { Styled } from '../../styles/Add.styles'
import { HABITS, SINGLE_HABIT } from '../../utils/queries'
import { CREATE_HABIT, DELETE_HABIT, UPDATE_HABIT } from '../../utils/mutations'
import { habitIdState, habitTitleState } from '../../utils/atoms'
import { useMutation, useQuery, useLazyQuery } from '@apollo/client'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { useHistory } from 'react-router-dom'

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

  const titleRef: React.RefObject<HTMLInputElement> = useRef(null)
  const history = useHistory()

  const cleanData = useCallback(() => {
    setHabitId('')
    setTitle('')
  }, [setHabitId, setTitle])

  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault()
    if (title) {
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
    } else {
      setNotification({
        text: `You need to insert a title for your habit`,
        type: NotificationTypes.Error
      })
    }
  }

  const handleDeleteConfirm = () => {
    setAlert({
      text: 'This habit will be removed',
      onConfirm: handleDeleteHabit
    })
  }

  const handleDeleteHabit = () => {
    deleteHabit()
      .then(res => {
        setNotification({
          text: `Habit '${title}' was deleted`,
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

      <form onSubmit={handleSubmit}>
        <Styled.AddInputWrapper>
          <Styled.AddInput__Label>Title</Styled.AddInput__Label>
          <Styled.AddInput
            type="text"
            placeholder="Ex: Exercise for 30 min"
            value={title}
            onChange={e => setTitle(e.target.value)}
            ref={titleRef}
            data-test-id="add-habit-title-input"
          />
        </Styled.AddInputWrapper>
        <Styled.AddWidgetsContainer>
          <SubmitButton />
        </Styled.AddWidgetsContainer>
      </form>
    </>
  )
}

export default AddHabit
