import styled from 'styled-components'

const HomeLogo = styled.h1`
  position: absolute;
  top: 2rem;
  left: 0;
  right: 0;
  color: ${props => props.theme.white};
  font-size: 2rem;
  font-weight: ${props => props.theme.fontExtraBold};
  text-transform: uppercase;
  text-align: center;
`

const HomeContainer = styled.div`
  width: 85%;
  margin: ${props => props.theme.spacingXL} auto 0 auto;
`
const HomeText = styled.h2`
  color: ${props => props.theme.white};
  font-size: 3rem;
  line-height: 4.5rem;
  font-weight: ${props => props.theme.fontRegular};

  strong {
    font-weight: ${props => props.theme.fontSemiBold};
    color: ${props => props.theme.mainBlue};
  }
`

const HomeGrid = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 4rem;
  margin-top: ${props => props.theme.spacingL};

  > a:nth-child(odd) {
    justify-self: flex-end;
  }

  > a:nth-child(even) .widget {
    transform: translateY(${props => props.theme.spacingS});
  }
`

export const Styled = {
  HomeLogo,
  HomeContainer,
  HomeText,
  HomeGrid
}
