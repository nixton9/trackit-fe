import React from 'react'
import { LoadingSpinner } from './LoadingSpinner'
import { Styled } from '../../styles/Page.styles'

type PageLoadingProps = {
  centered?: boolean
}

export const PageLoading: React.FC<PageLoadingProps> = ({ centered }) => (
  <Styled.PageLoading className={centered ? 'centered' : ''}>
    <LoadingSpinner />
  </Styled.PageLoading>
)
