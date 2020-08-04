import styled from 'styled-components'

type SingleTaskCategoryProps = {
  color: string
}

const SingleTaskContainer = styled.article`
  width: 100%;
  padding: ${props => props.theme.spacingS} ${props => props.theme.spacingXXS};
  border-top: 1px solid ${props => props.theme.greyishBlue};

  &:last-child {
    border-bottom: 1px solid ${props => props.theme.greyishBlue};
  }
`

const SingleTaskFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const SingleTaskTitle = styled.h5`
  color: ${props => props.theme.white};
  font-weight: ${props => props.theme.fontLight};
  font-size: 1.4rem;
`

const SingleTaskDate = styled.p`
  color: ${props => props.theme.greyishBlue};
  font-weight: ${props => props.theme.fontSemiBold};
  font-size: 1rem;
`

const SingleTaskCategory = styled.h6<SingleTaskCategoryProps>`
  color: ${props => props.color};
  font-size: 1.2rem;
  font-weight: ${props => props.theme.fontMedium};
  margin-left: ${props => props.theme.spacingXS};
`

const SingleTaskComplete = styled.div`
  width: 1.8rem;
  height: 1.8rem;
  border: solid 2px #6268f1;
  border-radius: 50%;
`

export const Styled = {
  SingleTaskContainer,
  SingleTaskFlex,
  SingleTaskTitle,
  SingleTaskDate,
  SingleTaskCategory,
  SingleTaskComplete
}
