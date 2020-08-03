import React from 'react'
import Tag from './Tag'
import { Styled } from '../../styles/SingleNote.styles'
import { Note } from '../../utils/ModuleTypes'
import moment from 'moment'

const SingleNote: React.FC<Note> = ({ id, title, date, tags }) => {
  return (
    <Styled.SingleNoteContainer>
      <Styled.SingleNoteFlex>
        <div>
          <Styled.SingleNoteTitle>{title}</Styled.SingleNoteTitle>
          <Styled.SingleNoteDate>
            {moment(date).format('D MMMM')}
          </Styled.SingleNoteDate>
        </div>
        <Styled.SingleNoteTags>
          {tags &&
            tags.map(tag => (
              <Tag key={tag.id} id={tag.id} name={tag.name} color={tag.color} />
            ))}
        </Styled.SingleNoteTags>
      </Styled.SingleNoteFlex>
    </Styled.SingleNoteContainer>
  )
}

export default SingleNote
