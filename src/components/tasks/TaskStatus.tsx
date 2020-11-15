import React from 'react'
import styled from 'styled-components'

const TaskStatusDiv = styled.div`
  width: 2rem;
  height: 2rem;
  border: solid 2px ${props => props.theme.accent};
  border-radius: 50%;
  cursor: pointer;

  &.done {
    background-color: ${props => props.theme.accent};
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
