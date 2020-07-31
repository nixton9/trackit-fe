import styled from 'styled-components'

type NoteTagChipProps = {
  color: string
}

const NoteTagChip = styled.div<NoteTagChipProps>`
  background-color: ${props => props.color};
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
  NoteTagChip
}
