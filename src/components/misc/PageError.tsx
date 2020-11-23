import React from 'react'
import { Styled } from '../../styles/Page.styles'
import { ReactComponent as ErrorIcon } from '../../assets/icons/error.svg'

export const PageError: React.FC = ({ children }) => (
  <Styled.PageError>
    <ErrorIcon />
    <p>{children}</p>
  </Styled.PageError>
)
