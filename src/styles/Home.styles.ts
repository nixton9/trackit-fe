import styled from 'styled-components/macro'
import { device } from './theme'

const HomeLogo = styled.h1`
  position: fixed;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: ${props => props.theme.white};
  font-size: 2rem;
  font-weight: ${props => props.theme.fontExtraBold};
  text-transform: uppercase;
`

const HomeContainer = styled.div`
  position: relative;
  width: 85%;
  margin: ${props => props.theme.spacingXXL} auto 0 auto;
  z-index: 1;
  max-width: 150rem;
  min-height: 60vh;

  @media ${device.tabletXL} {
    margin: ${props => props.theme.spacingXL} auto 0 auto;
  }
`
const HomeText = styled.h2`
  color: ${props => props.theme.white};
  font-size: 3.7rem;
  line-height: 5.2rem;
  font-weight: ${props => props.theme.fontSemiBold};

  @media ${device.tabletXL} {
    font-size: 3rem;
    line-height: 4.5rem;
  }

  strong {
    font-weight: ${props => props.theme.fontSemiBold};
    color: ${props => props.theme.accent};
  }
`

const HomeGrid = styled.section`
  display: flex;
  justify-content: center;
  margin-top: ${props => props.theme.spacingXL};

  .widget-container {
    margin: 0 2rem;
  }

  @media ${device.tabletXL} {
    .widget-container {
      margin: 0 1rem;
    }
  }

  @media ${device.tablet} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 4rem;
    margin-top: ${props => props.theme.spacingXL};

    .widget-container {
      margin: 0;
    }
  }

  > div:nth-child(odd) {
    justify-self: flex-end;
  }

  > div:nth-child(even) {
    @media ${device.tablet} {
      transform: translateY(${props => props.theme.spacingS});
    }
  }

  @media ${device.mobile} {
    margin-top: ${props => props.theme.spacingM};
    grid-gap: 3rem;

    > div:nth-child(even) {
      transform: translateY(2rem);
    }
  }
`

const HomeLoading = styled.div`
  width: 100%;
  height: 45rem;
  display: flex;
  align-items: center;
  justify-content: center;
`
export const Styled = {
  HomeLogo,
  HomeContainer,
  HomeText,
  HomeGrid,
  HomeLoading
}
