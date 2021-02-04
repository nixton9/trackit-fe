import React from 'react'
import styled from 'styled-components/macro'

const TaskStatusDiv = styled.div`
  position: relative;
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

  &:after {
    content: '';
    position: absolute;
    width: 300%;
    height: 300%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
