import styled from 'styled-components'

type SearchProps = {
  open: boolean
}

const SearchIcon = styled.div<SearchProps>`
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 11;
  cursor: pointer;

  svg {
    width: 3.6rem;
    position: relative;
    z-index: 1;
    transform: ${props =>
      props.open ? 'scale(.6) translateX(-.6rem)' : 'scale(1) translateX(0)'};
    transition: transform 0.15s linear;

    .svg-fill {
      fill: ${props => props.theme.white};
    }
    .svg-stroke {
      stroke: ${props => props.theme.white};
    }
  }
`

const SearchInput = styled.input<SearchProps>`
  background-color: ${props => props.theme.surfacesBlack};
  width: 30rem;
  position: absolute;
  right: 0;
  top: 0;
  border-radius: 20px;
  color: ${props => props.theme.white};
  border: none;
  padding: 1rem 3.8rem 1rem 2rem;
  font-size: 1.15rem;
  font-weight: ${props => props.theme.fontRegular};
  box-shadow: 11px 15px 16px 0 rgba(0, 0, 0, 0.07);
  transform-origin: right;
  transform: ${props => (props.open ? 'scaleX(1)' : 'scaleX(0)')};
  transition: transform 0.15s linear;

  &::placeholder {
    color: ${props => props.theme.grey};
  }

  &:-ms-input-placeholder {
    color: ${props => props.theme.grey};
  }

  &::-ms-input-placeholder {
    color: ${props => props.theme.grey};
  }
`

const SearchOverlay = styled.div<SearchProps>`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;
  display: ${props => (props.open ? 'block' : 'none')};
  z-index: 1;
`

export const Styled = {
  SearchIcon,
  SearchInput,
  SearchOverlay
}
