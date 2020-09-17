import React from 'react'
import Tag from './Tag'
import { Styled } from '../../styles/Single.styles'
import { Note } from '../../utils/ModuleTypes'
import { NavLink } from 'react-router-dom'
import { displayDateString } from '../../utils/dateHelpers'

const SingleNote: React.FC<Note> = ({ id, title, date, tags }) => {
  return (
    <Styled.SingleContainer>
      <NavLink to={`notes/${id}`}>
        <Styled.SingleFlex>
          <div>
            <Styled.SingleTitle>{title}</Styled.SingleTitle>
            <Styled.SingleDate>
              {displayDateString(date.substring(0, 10))}
            </Styled.SingleDate>
          </div>
          <Styled.SingleNote__Tags>
            {tags &&
              tags.map(tag => (
                <Tag
                  key={tag.id}
                  id={tag.id}
                  name={tag.name}
                  color={tag.color}
                />
              ))}
          </Styled.SingleNote__Tags>
        </Styled.SingleFlex>
      </NavLink>
    </Styled.SingleContainer>
  )
}

export default SingleNote
