import React from 'react'
import styled from 'styled-components'

const TaskStatusDiv = styled.div`
  width: 1.8rem;
  height: 1.8rem;
  border: solid 2px ${props => props.theme.mainBlue};
  border-radius: 50%;
  cursor: pointer;

  &.done {
    background-color: ${props => props.theme.mainBlue};
  }
`

export const TaskStatus = ({
  isDone,
  onClick
}: {
  isDone: Boolean
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
}) => {
  return (
    <TaskStatusDiv
      onClick={onClick}
      className={isDone ? 'task-status done' : 'task-status'}
    />
  )
}
