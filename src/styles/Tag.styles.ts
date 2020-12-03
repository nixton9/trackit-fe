import styled from 'styled-components/macro'

type TagChipProps = {
  color: string
  hasDelete?: boolean
}

const TagChip = styled.div<TagChipProps>`
  position: relative;
  transition: all 0.1s ease;

  &:active {
    transform: translateY(1px);
  }

  .inner {
    background-color: ${props => props.color};
    color: ${props => props.theme.alwaysWhite};
    min-width: 5rem;
    text-align: center;
    padding: 0.3rem 0.9rem;
    border-radius: ${props => props.theme.bigBorderRadius};
    margin: 0 1.5rem 1.5rem 0;
    font-size: 1rem;
    font-weight: ${props => props.theme.fontMedium};
    cursor: ${props => (props.hasDelete ? 'pointer' : 'default')};
  }

  .delete {
    position: absolute;
    top: -5px;
    right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.white};
    color: ${props => props.theme.backgroundBlack};
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    font-size: 1.5rem;
    font-weight: ${props => props.theme.fontSemiBold};
    transform: rotate(45deg);
    opacity: 0;
    transition: all 0.2s ease;
    cursor: pointer;
  }

  &:hover .delete {
    opacity: 1;
  }
`

export const Styled = {
  TagChip
}
