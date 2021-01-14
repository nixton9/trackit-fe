import React, { useEffect, useState, Dispatch, SetStateAction } from 'react'
import { LoadingSpinner } from '../misc/LoadingSpinner'
import { ReactComponent as ErrorIcon } from '../../assets/icons/error.svg'
import { Styled } from '../../styles/Add.styles'
import { TAGS } from '../../utils/queries'
import { ReactComponent as CategoriesIcon } from '../../assets/icons/categories.svg'
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
  excludedTags?: any
  setTags: Dispatch<SetStateAction<Tag[] | []>>
}

export const TagsInput: React.FC<TagsInputProps> = ({
  tags,
  excludedTags,
  setTags
}) => {
  const { loading, error, data } = useQuery(TAGS)

  const [inputTags, setInputTags] = useState<Tag[]>([])

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

  const focusTagInput = () => {
    const input = document.querySelector('.ReactTags__tagInputField') as any
    input && input.focus()
  }

  useEffect(() => {
    const newTags = tags.map(tag =>
      tag.text ? { ...tag } : { ...tag, text: tag.name || '' }
    )
    setInputTags(newTags)
  }, [tags])

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
    <Styled.AddWidget onClick={focusTagInput}>
      <CategoriesIcon />
      <Styled.AddTags>
        <ReactTags
          tags={inputTags}
          suggestions={
            excludedTags
              ? suggestions.filter(
                  (sugg: Tag) => !excludedTags.includes(sugg.id)
                )
              : suggestions
          }
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          delimiters={delimiters}
          placeholder="Tags"
          minQueryLength={1}
          allowDragDrop={false}
        />
      </Styled.AddTags>
    </Styled.AddWidget>
  )
}
