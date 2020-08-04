import styled from 'styled-components'

const SingleNoteContainer = styled.article`
  width: 100%;
  padding: ${props => props.theme.spacingS} ${props => props.theme.spacingXXS};
  border-top: 1px solid ${props => props.theme.greyishBlue};

  &:last-child {
    border-bottom: 1px solid ${props => props.theme.greyishBlue};
  }
`

const SingleNoteFlex = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`

const SingleNoteTitle = styled.h5`
  color: ${props => props.theme.white};
  font-weight: ${props => props.theme.fontLight};
  font-size: 1.4rem;
`

const SingleNoteDate = styled.p`
  color: ${props => props.theme.greyishBlue};
  font-weight: ${props => props.theme.fontSemiBold};
  font-size: 1rem;
`

const SingleNoteTags = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const Styled = {
  SingleNoteContainer,
  SingleNoteFlex,
  SingleNoteTitle,
  SingleNoteDate,
  SingleNoteTags
}
