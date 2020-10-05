import React, { Dispatch, SetStateAction } from 'react'
import { LoadingSpinner } from '../misc/LoadingSpinner'
import { ReactComponent as ErrorIcon } from '../../assets/icons/error.svg'
import { Styled } from '../../styles/Add.styles'
import { TAGS } from '../../utils/queries'
import { WithContext as ReactTags } from 'react-tag-input'
import { useQuery } from '@apollo/client'

const KeyCodes = {
  comma: 188,
  enter: 13
}

const delimiters = [KeyCodes.comma, KeyCodes.enter]

export type Tag = {
  id: string
  text: string
  name?: string
  color?: string
}

type TagsInputProps = {
  tags: Tag[]
  setTags: Dispatch<SetStateAction<Tag[] | []>>
}

export const TagsInput: React.FC<TagsInputProps> = ({ tags, setTags }) => {
  const { loading, error, data } = useQuery(TAGS)

  const handleDelete = (i: number) => {
    const newTags = tags.filter((tag: Tag, index: number) => index !== i)
    setTags(newTags)
  }

  const handleAddition = (tag: Tag) => {
    setTags([...tags, tag])
  }

  const suggestions = data
    ? data.tags.map((tag: Tag) => ({
        id: tag.id,
        text: tag.name,
        color: tag.color
      }))
    : []

  return loading ? (
    <Styled.AddTags_Loading>
      <LoadingSpinner />
    </Styled.AddTags_Loading>
  ) : error ? (
    <Styled.AddMessage>
      <ErrorIcon />
      <p>{error.message}</p>
    </Styled.AddMessage>
  ) : (
    <Styled.AddTags>
      <ReactTags
        tags={tags}
        suggestions={suggestions}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        delimiters={delimiters}
        placeholder="Tags"
        minQueryLength={1}
        allowDragDrop={false}
      />
    </Styled.AddTags>
  )
}
