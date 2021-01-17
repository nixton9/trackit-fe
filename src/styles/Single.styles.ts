import styled from 'styled-components/macro'

type SingleCategoryProps = {
  color: string
}

type SingleDateProps = {
  past?: boolean
}

const SingleWrapper = styled.div`
  position: relative;

  .task-status {
    position: absolute;
    right: ${props => props.theme.spacingXS};
    top: 50%;
    transform: translateY(-50%);
  }
`

const SingleContainer = styled.article`
  width: 100%;
  padding: ${props => props.theme.spacingS} ${props => props.theme.spacingXXS};
  border-top: 1px solid rgb(119, 118, 118, 0.25);
  cursor: pointer;
  transition: all 0.1s ease;

  &:hover,
  &:active,
  &:focus {
    background-color: ${props => props.theme.hoverBlack};
  }

  &:last-child {
    border-bottom: 1px solid rgb(119, 118, 118, 0.25);
  }
`

const SingleFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .note-info {
    min-width: 40%;
  }
`

const SingleTitle = styled.h5`
  color: ${props => props.theme.white};
  font-weight: ${props => props.theme.fontLight};
  font-size: 1.4rem;

  &.note-title {
    margin-right: ${props => props.theme.spacingXS};
  }
`

const SingleDate = styled.div<SingleDateProps>`
  display: flex;
  align-items: center;
  margin-top: 0.4rem;

  svg {
    width: 1.8rem;
    margin-right: 0.8rem;

    .svg-fill {
      fill: ${props => (props.past ? props.theme.habitsRed : props.theme.grey)};
    }
    .svg-stroke {
      stroke: ${props =>
        props.past ? props.theme.habitsRed : props.theme.grey};
    }
  }

  p {
    color: ${props => (props.past ? props.theme.habitsRed : props.theme.grey)};
    font-weight: ${props => props.theme.fontSemiBold};
    font-size: 1.15rem;
  }
`

const SingleCategory = styled.h6<SingleCategoryProps>`
  color: ${props => props.color};
  font-size: 1.2rem;
  font-weight: ${props => props.theme.fontBold};
  margin-left: ${props => props.theme.spacingXS};
`

const SingleNote__Tags = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
`

const SingleExpense__Container = styled.article`
  padding: ${props => props.theme.spacingXS};
  margin-bottom: ${props => props.theme.spacingXS};
  border-radius: ${props => props.theme.XSBorderRadius};
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    background-color: ${props => props.theme.hoverBlack};
  }

  &:last-of-type {
    margin-bottom: 0;
  }
`

const SingleExpense__Value = styled.p`
  color: ${props => props.theme.accent};
  font-size: 1.3rem;
  font-weight: ${props => props.theme.fontBold};
  margin-left: auto;
`

export const Styled = {
  SingleWrapper,
  SingleContainer,
  SingleFlex,
  SingleTitle,
  SingleDate,
  SingleCategory,
  SingleNote__Tags,
  SingleExpense__Container,
  SingleExpense__Value
}
