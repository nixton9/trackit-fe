import styled from 'styled-components'

type SingleCategoryProps = {
  color: string
}

type SingleDateProps = {
  past?: boolean
}

const SingleContainer = styled.article`
  width: 100%;
  padding: ${props => props.theme.spacingS} ${props => props.theme.spacingXXS};
  border-top: 1px solid ${props => props.theme.greyishBlue};

  &:last-child {
    border-bottom: 1px solid ${props => props.theme.greyishBlue};
  }
`

const SingleFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const SingleTitle = styled.h5`
  color: ${props => props.theme.white};
  font-weight: ${props => props.theme.fontLight};
  font-size: 1.4rem;
`

const SingleDate = styled.div<SingleDateProps>`
  display: flex;
  align-items: center;
  margin-top: 0.4rem;

  svg {
    width: 1.8rem;
    margin-right: 0.8rem;

    .svg-fill {
      fill: ${props =>
        props.past ? props.theme.habitsRed : props.theme.greyishBlue};
    }
    .svg-stroke {
      stroke: ${props =>
        props.past ? props.theme.habitsRed : props.theme.greyishBlue};
    }
  }

  p {
    color: ${props =>
      props.past ? props.theme.habitsRed : props.theme.greyishBlue};
    font-weight: ${props => props.theme.fontSemiBold};
    font-size: 1.15rem;
  }
`

const SingleCategory = styled.h6<SingleCategoryProps>`
  color: ${props => props.color};
  font-size: 1.2rem;
  font-weight: ${props => props.theme.fontMedium};
  margin-left: ${props => props.theme.spacingXS};
`

const SingleNote__Tags = styled.div`
  display: flex;
  justify-content: flex-end;
`

const SingleExpense__Container = styled.article`
  margin-bottom: ${props => props.theme.spacingS};

  &:last-of-type {
    margin-bottom: 0;
  }
`

const SingleExpense__Value = styled.p`
  color: ${props => props.theme.mainBlue};
  font-size: 1.3rem;
  font-weight: ${props => props.theme.fontRegular};
  margin-left: auto;
`
const SingleTask__Complete = styled.div`
  width: 1.8rem;
  height: 1.8rem;
  border: solid 2px ${props => props.theme.mainBlue};
  border-radius: 50%;
  cursor: pointer;

  &.done {
    background-color: ${props => props.theme.mainBlue};
  }
`

export const Styled = {
  SingleContainer,
  SingleFlex,
  SingleTitle,
  SingleDate,
  SingleCategory,
  SingleNote__Tags,
  SingleExpense__Container,
  SingleExpense__Value,
  SingleTask__Complete
}
