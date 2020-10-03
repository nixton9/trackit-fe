import React, { useState } from 'react'
import { Styled } from '../../styles/Single.styles'
import { Task } from '../../utils/ModuleTypes'
import {
  displayDateString,
  isPastDate,
  parseDateInverse
} from '../../utils/dateHelpers'
import { TASKS } from '../../utils/queries'
import { ReactComponent as CalendarIcon } from '../../assets/icons/calendr.svg'
import { gql, useMutation, useQuery } from '@apollo/client'

const MARK_AS_DONE = gql`
  mutation MarkAsDone($id: ID!, $done: Boolean) {
    updateTask(id: $id, done: $done) {
      id_task
      done
    }
  }
`

const SingleTask: React.FC<Task> = ({ id, title, date, done, category }) => {
  const [taskDone, setTaskDone] = useState(false)

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

  return (
    <Styled.SingleContainer>
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
          <Styled.SingleDate past={isPastDate(parseDateInverse(date))}>
            <CalendarIcon />
            <p>{displayDateString(parseDateInverse(date))}</p>
          </Styled.SingleDate>
        </div>
        <Styled.SingleTask__Complete
          onClick={handleCompleteTask}
          className={taskDone ? 'done' : ''}
        />
      </Styled.SingleFlex>
    </Styled.SingleContainer>
  )
}

export default SingleTask
