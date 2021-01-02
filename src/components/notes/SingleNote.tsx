import React from 'react'
import Tag from './Tag'
import { Styled } from '../../styles/Single.styles'
import { Note } from '../../utils/ModuleTypes'
import { ReactComponent as CalendarIcon } from '../../assets/icons/calendar.svg'
import { NavLink } from 'react-router-dom'
import { displayDateString, parseDateInverse } from '../../utils/dateHelpers'

const SingleNote: React.FC<Note> = ({ id, title, date, tags }) => {
  return (
    <Styled.SingleContainer>
      <NavLink to={`notes/${id}`}>
        <Styled.SingleFlex>
          <div>
            <Styled.SingleTitle className="note-title">
              {title}
            </Styled.SingleTitle>
            <Styled.SingleDate>
              <CalendarIcon />
              <p>{displayDateString(parseDateInverse(date))}</p>
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
