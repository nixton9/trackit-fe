import React from 'react'
import { Styled } from '../../styles/Single.styles'
import { Task } from '../../utils/ModuleTypes'
import { displayDateString } from '../../utils/dateHelpers'

const SingleNote: React.FC<Task> = ({ id, title, date, done, category }) => {
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
          <Styled.SingleDate>{displayDateString(date)}</Styled.SingleDate>
        </div>
        <Styled.SingleTask__Complete />
      </Styled.SingleFlex>
    </Styled.SingleContainer>
  )
}

export default SingleNote
