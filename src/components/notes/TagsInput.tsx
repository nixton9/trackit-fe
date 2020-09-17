import React, { Dispatch, SetStateAction } from 'react'
import { WithContext as ReactTags } from 'react-tag-input'
import { LoadingSpinner } from '../misc/LoadingSpinner'
import { ReactComponent as ErrorIcon } from '../../assets/icons/error.svg'
import { Styled } from '../../styles/Add.styles'
import { TAGS } from '../../utils/queries'
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

  const handleDrag = (tag: Tag, currPos: number, newPos: number) => {
    const newTags = tags.slice()
    newTags.splice(currPos, 1)
    newTags.splice(newPos, 0, tag)
    setTags(newTags)
  }

  const suggestions = data
    ? data.tags.map((tag: Tag) => ({
        id: tag.id,
        text: tag.name,
        color: tag.color
      }))
    : []

  const customSugg = (item: Tag) => (
    <Styled.AddTags_Suggestion>
      <p>{item.text}</p>
      <span
        style={{ backgroundColor: item.color, width: '40px', height: '40px' }}
      ></span>
    </Styled.AddTags_Suggestion>
  )

  return loading ? (
    <Styled.AddLoading>
      <LoadingSpinner />
    </Styled.AddLoading>
  ) : error ? (
    <Styled.AddMessage>
      <ErrorIcon />
      <p>{error.message}</p>
    </Styled.AddMessage>
  ) : (
    <ReactTags
      tags={tags}
      suggestions={suggestions}
      handleDelete={handleDelete}
      handleAddition={handleAddition}
      handleDrag={handleDrag}
      delimiters={delimiters}
      placeholder="Tags"
      minQueryLength={1}
      renderSuggestion={customSugg}
    />
  )
}
