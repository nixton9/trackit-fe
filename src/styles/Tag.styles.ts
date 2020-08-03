import styled from 'styled-components'

type TagChipProps = {
  color: string
}

const TagChip = styled.div<TagChipProps>`
  background-color: ${props => props.color};
  min-width: 5rem;
  text-align: center;
  padding: 0.3rem 0.9rem;
  border-radius: ${props => props.theme.bigBorderRadius};

  &:not(:last-of-type) {
    margin-right: ${props => props.theme.spacingXS};
  }

  span {
    color: ${props => props.theme.white};
    font-size: 0.9rem;
    font-weight: ${props => props.theme.fontMedium};
  }
`

export const Styled = {
  TagChip
}
