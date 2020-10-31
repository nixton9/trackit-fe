import styled from 'styled-components'

const HomeLogo = styled.h1`
  position: absolute;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: ${props => props.theme.white};
  font-size: 2rem;
  font-weight: ${props => props.theme.fontExtraBold};
  text-transform: uppercase;
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
    color: ${props => props.theme.accent};
  }
`

const HomeGrid = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 4rem;
  margin-top: ${props => props.theme.spacingL};

  > div:nth-child(odd) {
    justify-self: flex-end;
  }

  > div:nth-child(even) {
    transform: translateY(${props => props.theme.spacingS});
  }
`

const HomeLoading = styled.div`
  width: 100%;
  height: 45rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

const HomeError = styled.div`
  width: 100%;
`

export const Styled = {
  HomeLogo,
  HomeContainer,
  HomeText,
  HomeGrid,
  HomeLoading,
  HomeError
}
