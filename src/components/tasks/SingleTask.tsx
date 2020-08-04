import React from 'react'
import { Styled } from '../../styles/SingleTask.styles'
import { Task } from '../../utils/ModuleTypes'
import moment from 'moment'

const SingleNote: React.FC<Task> = ({ id, title, date, done, category }) => {
  return (
    <Styled.SingleTaskContainer>
      <Styled.SingleTaskFlex>
        <div>
          <Styled.SingleTaskFlex>
            <Styled.SingleTaskTitle>{title}</Styled.SingleTaskTitle>
            {category && (
              <Styled.SingleTaskCategory color={category.color}>
                {category.name}
              </Styled.SingleTaskCategory>
            )}
          </Styled.SingleTaskFlex>
          <Styled.SingleTaskDate>
            {moment(date).format('D MMM')}
          </Styled.SingleTaskDate>
        </div>
        <Styled.SingleTaskComplete />
      </Styled.SingleTaskFlex>
    </Styled.SingleTaskContainer>
  )
}

export default SingleNote
