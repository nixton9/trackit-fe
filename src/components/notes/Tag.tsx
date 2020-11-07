import React from 'react'
import { Styled } from '../../styles/Tag.styles'
import { NoteTag } from '../../utils/ModuleTypes'

interface NoteTagProps extends NoteTag {
  onDelete?: () => void
  onClick?: () => void
}

const Tag: React.FC<NoteTagProps> = ({ name, color, onDelete, onClick }) => {
  return (
    <Styled.TagChip
      className="single-tag"
      color={color}
      hasDelete={Boolean(onDelete)}
    >
      <div className="inner" onClick={onClick}>
        {name}
      </div>
      {onDelete && (
        <span className="delete" onClick={onDelete}>
          +
        </span>
      )}
    </Styled.TagChip>
  )
}

export default Tag
