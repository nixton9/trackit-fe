import React from 'react'
import styled from 'styled-components'

const TaskStatusDiv = styled.div`
  width: 2rem;
  height: 2rem;
  border: solid 2px ${props => props.theme.accent};
  border-radius: 50%;
  flex-shrink: 0;
  cursor: pointer;
  transition: all 0.25s ease;

  &.disabled {
    cursor: unset;
    opacity: 0.2;
  }

  &.done {
    background-color: ${props => props.theme.accent};
  }
`

export const TaskStatus = ({
  isDone,
  disable,
  onClick
}: {
  isDone: Boolean
  disable?: Boolean
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
}) => {
  return disable ? (
    <TaskStatusDiv
      className={isDone ? 'task-status disabled done' : 'task-status disabled'}
    />
  ) : (
    <TaskStatusDiv
      onClick={onClick}
      className={isDone ? 'task-status done' : 'task-status'}
    />
  )
}
