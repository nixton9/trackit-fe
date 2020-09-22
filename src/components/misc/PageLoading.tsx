import React from 'react'
import { LoadingSpinner } from './LoadingSpinner'
import { Styled } from '../../styles/Page.styles'

export const PageLoading: React.FC = () => (
  <Styled.PageLoading>
    <LoadingSpinner />
  </Styled.PageLoading>
)
