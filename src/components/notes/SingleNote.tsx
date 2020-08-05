import React from 'react'
import Tag from './Tag'
import { Styled } from '../../styles/SingleNote.styles'
import { Note } from '../../utils/ModuleTypes'
import { NavLink } from 'react-router-dom'
import { displayDateString } from '../../utils/dateHelpers'

const SingleNote: React.FC<Note> = ({ id, title, date, tags }) => {
  return (
    <Styled.SingleNoteContainer>
      <NavLink to={`notes/${id}`}>
        <Styled.SingleNoteFlex>
          <div>
            <Styled.SingleNoteTitle>{title}</Styled.SingleNoteTitle>
            <Styled.SingleNoteDate>
              {displayDateString(date)}
            </Styled.SingleNoteDate>
          </div>
          <Styled.SingleNoteTags>
            {tags &&
              tags.map(tag => (
                <Tag
                  key={tag.id}
                  id={tag.id}
                  name={tag.name}
                  color={tag.color}
                />
              ))}
          </Styled.SingleNoteTags>
        </Styled.SingleNoteFlex>
      </NavLink>
    </Styled.SingleNoteContainer>
  )
}

export default SingleNote
