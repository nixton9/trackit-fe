import React from 'react'
import { Styled } from '../../styles/Tag.styles'
import { NoteTag } from '../../utils/ModuleTypes'

const Tag: React.FC<NoteTag> = ({ name, color }) => {
  return (
    <Styled.TagChip className="single-tag" color={color}>
      <span>{name}</span>
    </Styled.TagChip>
  )
}

export default Tag
