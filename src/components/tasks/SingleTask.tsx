import React, { useState } from 'react'
import { TaskStatus } from './TaskStatus'
import { activeContentState, isEditState } from '../misc/Add'
import { NotificationTypes, notificationState } from '../misc/Notification'
import { Styled } from '../../styles/Single.styles'
import { ModuleTypes, Task } from '../../utils/ModuleTypes'
import { taskIdState } from '../../utils/atoms'
import {
  displayDateString,
  isPastDate,
  parseDateInverse
} from '../../utils/dateHelpers'
import { TASKS } from '../../utils/queries'
import { ReactComponent as CalendarIcon } from '../../assets/icons/calendar.svg'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useSetRecoilState } from 'recoil'

const MARK_AS_DONE = gql`
  mutation MarkAsDone($id: ID!, $done: Boolean) {
    updateTask(id: $id, done: $done) {
      id_task
      done
    }
  }
`

interface SingleTaskProps extends Task {
  disableStatus?: boolean
}

const SingleTask: React.FC<SingleTaskProps> = ({
  id,
  title,
  date,
  done,
  category,
  disableStatus
}) => {
  const [taskDone, setTaskDone] = useState(done)

  const setActiveContent = useSetRecoilState(activeContentState)
  const setTaskId = useSetRecoilState(taskIdState)
  const setIsEdit = useSetRecoilState(isEditState)

  const setNotification = useSetRecoilState(notificationState)

  const { refetch: refetchTasks } = useQuery(TASKS)
  const [markAsDone] = useMutation(MARK_AS_DONE)

  const handleCompleteTask = (e: React.MouseEvent<HTMLDivElement>) => {
    setTaskDone(true)
    markAsDone({
      variables: { id: id, done: true }
    })
      .then(res => {
        setNotification({
          text: `Task '${title}' was completed.`,
          type: NotificationTypes.Blank,
          revert: () =>
            markAsDone({
              variables: { id: id, done: false },
              refetchQueries: () => [
                {
                  query: TASKS
                }
              ]
            })
        })
        refetchTasks()
      })
      .catch(err => console.log(err))
  }

  const handleTaskEdit = () => {
    setActiveContent(ModuleTypes.Tasks)
    setIsEdit(true)
    setTaskId(id.toString())
  }

  return (
    <Styled.SingleWrapper className="single-task">
      <Styled.SingleContainer onClick={handleTaskEdit} className="task">
        <Styled.SingleFlex>
          <div>
            <Styled.SingleFlex>
              <Styled.SingleTitle>{title}</Styled.SingleTitle>
              {category && (
                <Styled.SingleCategory color={category.color}>
                  {category.name}
                </Styled.SingleCategory>
              )}
            </Styled.SingleFlex>
            {date && (
              <Styled.SingleDate past={isPastDate(parseDateInverse(date))}>
                <CalendarIcon />
                <p>{displayDateString(parseDateInverse(date))}</p>
              </Styled.SingleDate>
            )}
          </div>
        </Styled.SingleFlex>
      </Styled.SingleContainer>
      <TaskStatus
        onClick={handleCompleteTask}
        isDone={taskDone}
        disable={disableStatus}
      />
    </Styled.SingleWrapper>
  )
}

export default SingleTask
