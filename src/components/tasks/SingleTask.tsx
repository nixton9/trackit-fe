import React, { useState } from 'react'
import { taskIdState } from './AddTask'
import { TaskStatus } from './TaskStatus'
import { activeContentState, isEditState } from '../misc/Add'
import { Styled } from '../../styles/Single.styles'
import { ModuleTypes, Task } from '../../utils/ModuleTypes'
import {
  displayDateString,
  isPastDate,
  parseDateInverse
} from '../../utils/dateHelpers'
import { TASKS } from '../../utils/queries'
import { ReactComponent as CalendarIcon } from '../../assets/icons/calendr.svg'
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

const SingleTask: React.FC<Task> = ({ id, title, date, done, category }) => {
  const [taskDone, setTaskDone] = useState(done)

  const setActiveContent = useSetRecoilState(activeContentState)
  const setTaskId = useSetRecoilState(taskIdState)
  const setIsEdit = useSetRecoilState(isEditState)

  const { refetch: refetchTasks } = useQuery(TASKS)
  const [markAsDone] = useMutation(MARK_AS_DONE, {
    variables: { id: id, done: true }
  })

  const handleCompleteTask = (e: React.MouseEvent<HTMLDivElement>) => {
    setTaskDone(true)
    markAsDone()
      .then(res => refetchTasks())
      .catch(err => console.log(err))
  }

  const handleTaskEdit = () => {
    setActiveContent(ModuleTypes.Tasks)
    setIsEdit(true)
    setTaskId(id.toString())
  }
  return (
    <Styled.SingleWrapper>
      <Styled.SingleContainer onClick={handleTaskEdit}>
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
      <TaskStatus onClick={handleCompleteTask} isDone={taskDone} />
    </Styled.SingleWrapper>
  )
}

export default SingleTask
