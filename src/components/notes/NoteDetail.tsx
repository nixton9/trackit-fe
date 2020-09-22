import React, { useEffect } from 'react'
import Tag from './Tag'
import { PageLoading } from '../misc/PageLoading'
import { PageError } from '../misc/PageError'
import { Styled } from '../../styles/Page.styles'
import { displayDateString } from '../../utils/dateHelpers'
import { NoteTag } from '../../utils/ModuleTypes'
import { SINGLE_NOTE } from '../../utils/queries'
import { ReactComponent as ChevronIcon } from '../../assets/icons/chevron.svg'
import { Link, RouteComponentProps } from 'react-router-dom'
import { useQuery } from '@apollo/client'

type MatchParams = {
  id: string
}

interface MatchProps extends RouteComponentProps<MatchParams> {
  setWidgets: any
}

const NoteDetail: React.FC<MatchProps> = ({ match, setWidgets }) => {
  const { loading, error, data } = useQuery(SINGLE_NOTE, {
    variables: { id: match.params.id }
  })

  useEffect(() => {
    setWidgets(false)
    return () => setWidgets(true)
  })

  return (
    <Styled.PageContainer>
      <Styled.DetailBack>
        <Link to="/notes">
          <ChevronIcon />
        </Link>
      </Styled.DetailBack>

      {error ? (
        <PageError>{error.message}</PageError>
      ) : loading ? (
        <PageLoading />
      ) : (
        <>
          <Styled.DetailTitle>{data.singleNote.title}</Styled.DetailTitle>

          <Styled.DetailDate>
            {displayDateString(data.singleNote.date.substring(0, 10))}
          </Styled.DetailDate>

          <Styled.DetailTags>
            {data.singleNote.tags &&
              data.singleNote.tags.map((tag: NoteTag) => (
                <Tag
                  key={tag.id}
                  id={tag.id}
                  name={tag.name}
                  color={tag.color}
                />
              ))}
          </Styled.DetailTags>

          <Styled.DetailContent>{data.singleNote.content}</Styled.DetailContent>
        </>
      )}
    </Styled.PageContainer>
  )
}

export default NoteDetail
