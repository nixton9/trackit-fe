import styled from 'styled-components'

type SingleTaskCategoryProps = {
  color: string
}

const SingleExpenseContainer = styled.article`
  margin-bottom: ${props => props.theme.spacingS};

  &:last-of-type {
    margin-bottom: 0;
  }
`

const SingleExpenseFlex = styled.div`
  display: flex;
  align-items: center;
`

const SingleExpenseTitle = styled.h5`
  color: ${props => props.theme.white};
  font-weight: ${props => props.theme.fontLight};
  font-size: 1.4rem;
`

const SingleExpenseCategory = styled.h6<SingleTaskCategoryProps>`
  color: ${props => props.color};
  font-size: 1.2rem;
  font-weight: ${props => props.theme.fontMedium};
  margin-left: ${props => props.theme.spacingXS};
`

const SingleExpenseValue = styled.p`
  color: ${props => props.theme.mainBlue};
  font-size: 1.3rem;
  font-weight: ${props => props.theme.fontRegular};
  margin-left: auto;
`

export const Styled = {
  SingleExpenseContainer,
  SingleExpenseFlex,
  SingleExpenseTitle,
  SingleExpenseCategory,
  SingleExpenseValue
}
