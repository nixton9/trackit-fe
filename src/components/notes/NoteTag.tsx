import React from 'react'
import { Styled } from '../../styles/NoteTag.styles'

type NoteTagProps = {
  name: string
  color: string
}

const NoteTag: React.FC<NoteTagProps> = ({ name, color }) => {
  return (
    <Styled.NoteTagChip color={color}>
      <span>{name}</span>
    </Styled.NoteTagChip>
  )
}

export default NoteTag
